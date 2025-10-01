import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Play, Square, Trash2, Plus } from 'lucide-react';

const MusicComposer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [tracks, setTracks] = useState([
    { id: 1, instrument: 'piano', notes: [], muted: false, volume: -10 },
  ]);
  const [selectedTrack, setSelectedTrack] = useState(1);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [synths, setSynths] = useState({});

  const instruments = [
    { value: 'piano', label: '피아노', color: 'bg-blue-500' },
    { value: 'guitar', label: '기타', color: 'bg-green-500' },
    { value: 'bass', label: '베이스', color: 'bg-purple-500' },
    { value: 'drums', label: '타악기', color: 'bg-red-500' },
    { value: 'trumpet', label: '트럼펫', color: 'bg-yellow-500' },
    { value: 'saxophone', label: '색소폰', color: 'bg-pink-500' },
  ];

  const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
  const beats = Array.from({ length: 16 }, (_, i) => i);

  useEffect(() => {
    const newSynths = {};
    tracks.forEach(track => {
      if (!synths[track.id]) {
        let synth;
        switch(track.instrument) {
          case 'piano':
            synth = new Tone.PolySynth(Tone.Synth, {
              oscillator: { type: 'triangle' },
              envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
            }).toDestination();
            break;
          case 'guitar':
            synth = new Tone.PolySynth(Tone.Synth, {
              oscillator: { type: 'sawtooth' },
              envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.5 }
            }).toDestination();
            break;
          case 'bass':
            synth = new Tone.MonoSynth({
              oscillator: { type: 'square' },
              envelope: { attack: 0.01, decay: 0.3, sustain: 0.4, release: 0.5 }
            }).toDestination();
            break;
          case 'drums':
            synth = new Tone.MembraneSynth().toDestination();
            break;
          case 'trumpet':
            synth = new Tone.PolySynth(Tone.Synth, {
              oscillator: { type: 'square' },
              envelope: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 0.3 }
            }).toDestination();
            break;
          case 'saxophone':
            synth = new Tone.PolySynth(Tone.Synth, {
              oscillator: { type: 'sawtooth' },
              envelope: { attack: 0.05, decay: 0.1, sustain: 0.9, release: 0.4 }
            }).toDestination();
            break;
          default:
            synth = new Tone.PolySynth(Tone.Synth).toDestination();
        }
        synth.volume.value = track.volume;
        newSynths[track.id] = synth;
      }
    });
    setSynths(prev => ({ ...prev, ...newSynths }));
  }, [tracks]);

  const toggleNote = (trackId, beat, note) => {
    setTracks(tracks.map(track => {
      if (track.id === trackId) {
        const noteIndex = track.notes.findIndex(n => n.beat === beat && n.note === note);
        if (noteIndex > -1) {
          return { ...track, notes: track.notes.filter((_, i) => i !== noteIndex) };
        } else {
          return { ...track, notes: [...track.notes, { beat, note }] };
        }
      }
      return track;
    }));
  };

  const play = async () => {
    await Tone.start();
    Tone.Transport.bpm.value = bpm;
    
    Tone.Transport.cancel();
    
    tracks.forEach(track => {
      if (!track.muted && track.notes.length > 0) {
        const synth = synths[track.id];
        if (synth) {
          track.notes.forEach(({ beat, note }) => {
            if (track.instrument === 'drums') {
              Tone.Transport.schedule((time) => {
                synth.triggerAttackRelease('C2', '8n', time);
              }, `0:${beat}:0`);
            } else {
              Tone.Transport.schedule((time) => {
                synth.triggerAttackRelease(note, '8n', time);
              }, `0:${beat}:0`);
            }
          });
        }
      }
    });

    let beat = 0;
    Tone.Transport.scheduleRepeat((time) => {
      setCurrentBeat(beat);
      beat = (beat + 1) % 16;
    }, '8n');

    Tone.Transport.start();
    Tone.Transport.loop = true;
    Tone.Transport.loopEnd = '4m';
    setIsPlaying(true);
  };

  const stop = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    setIsPlaying(false);
    setCurrentBeat(-1);
  };

  const addTrack = () => {
    const newId = Math.max(...tracks.map(t => t.id)) + 1;
    setTracks([...tracks, { id: newId, instrument: 'piano', notes: [], muted: false, volume: -10 }]);
    setSelectedTrack(newId);
  };

  const deleteTrack = (id) => {
    if (tracks.length > 1) {
      setTracks(tracks.filter(t => t.id !== id));
      if (selectedTrack === id) {
        setSelectedTrack(tracks[0].id);
      }
    }
  };

  const clearTrack = (id) => {
    setTracks(tracks.map(t => t.id === id ? { ...t, notes: [] } : t));
  };

  const changeInstrument = (id, instrument) => {
    setTracks(tracks.map(t => t.id === id ? { ...t, instrument } : t));
  };

  const selectedTrackData = tracks.find(t => t.id === selectedTrack);

  return (
    <div className="w-full h-full bg-gray-900 text-white p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🎵 작곡 프로그램</h1>
        
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={isPlaying ? stop : play}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold ${
                isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isPlaying ? <><Square size={20} /> 정지</> : <><Play size={20} /> 재생</>}
            </button>
            
            <div className="flex items-center gap-2">
              <label className="font-semibold">BPM:</label>
              <input
                type="number"
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="w-20 px-3 py-2 bg-gray-700 rounded border border-gray-600"
                min="40"
                max="240"
              />
            </div>

            <button
              onClick={addTrack}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              <Plus size={20} /> 트랙 추가
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold mb-4">트랙 목록</h2>
          <div className="flex gap-2 flex-wrap">
            {tracks.map(track => {
              const inst = instruments.find(i => i.value === track.instrument);
              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedTrack === track.id ? inst.color : 'bg-gray-700'
                  }`}
                >
                  트랙 {track.id}: {inst.label}
                </button>
              );
            })}
          </div>
        </div>

        {selectedTrackData && (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">트랙 {selectedTrackData.id} 설정</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => clearTrack(selectedTrackData.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 rounded"
                >
                  <Trash2 size={16} /> 노트 지우기
                </button>
                {tracks.length > 1 && (
                  <button
                    onClick={() => deleteTrack(selectedTrackData.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded"
                  >
                    <Trash2 size={16} /> 트랙 삭제
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <label className="font-semibold">악기:</label>
              <select
                value={selectedTrackData.instrument}
                onChange={(e) => changeInstrument(selectedTrackData.id, e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded border border-gray-600"
              >
                {instruments.map(inst => (
                  <option key={inst.value} value={inst.value}>{inst.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">시퀀서</h2>
          <div className="inline-block min-w-full">
            <div className="flex mb-2">
              <div className="w-16"></div>
              {beats.map(beat => (
                <div
                  key={beat}
                  className={`w-12 h-8 flex items-center justify-center text-xs font-semibold ${
                    currentBeat === beat ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  {beat + 1}
                </div>
              ))}
            </div>
            
            {selectedTrackData && notes.map(note => (
              <div key={note} className="flex mb-1">
                <div className="w-16 flex items-center justify-center bg-gray-700 text-sm font-semibold">
                  {note}
                </div>
                {beats.map(beat => {
                  const hasNote = selectedTrackData.notes.some(
                    n => n.beat === beat && n.note === note
                  );
                  return (
                    <button
                      key={beat}
                      onClick={() => toggleNote(selectedTrackData.id, beat, note)}
                      className={`w-12 h-10 border border-gray-600 ${
                        hasNote
                          ? instruments.find(i => i.value === selectedTrackData.instrument).color
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicComposer;