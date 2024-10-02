
class MidiMsg {

    constructor() {
        this.cmds = [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            'Note Off',//8
            'Note On ',//9
            'Polyphonic Aftertouch',//10
            'Control Change',//11
            'Program Change',//12
            'Channel Aftertouch',//13
            'Pitch Bend',//14
            'System'];//15


        this.ccs = [
            'Bank Select',//0
            'Modulation',//1
            'Breath Controller',//2
            'Undefined',//3
            'Foot Controller',//4
            'Portamento Time',//5
            'Data Entry Most Significant Bit(MSB)',//6
            'Volume',//7
            'Balance',//8
            'Undefined',//9
            'Pan',//10
            'Expression',//11
            'Effect Controller 1',//12
            'Effect Controller 2',//13
            '',//14
            '',//15
            'General Purpose',//16
            'General Purpose',//17
            'General Purpose',//18
            'General Purpose',//19
            '',//20
            '',//21
            '',//22
            '',//23
            '',//24
            '',//25
            '',//26
            '',//27
            '',//28
            '',//29
            '',//30
            '',//31
            'Least Significant Bit (LSB)',//32
            'Least Significant Bit (LSB)',//33
            'Least Significant Bit (LSB)',//34
            'Least Significant Bit (LSB)',//35
            'Least Significant Bit (LSB)',//36
            'Least Significant Bit (LSB)',//37
            'Least Significant Bit (LSB)',//38
            'Least Significant Bit (LSB)',//39
            'Least Significant Bit (LSB)',//40
            'Least Significant Bit (LSB)',//41
            'Least Significant Bit (LSB)',//42
            'Least Significant Bit (LSB)',//43
            'Least Significant Bit (LSB)',//44
            'Least Significant Bit (LSB)',//45
            'Least Significant Bit (LSB)',//46
            'Least Significant Bit (LSB)',//47
            'Least Significant Bit (LSB)',//48
            'Least Significant Bit (LSB)',//49
            'Least Significant Bit (LSB)',//50
            'Least Significant Bit (LSB)',//51
            'Least Significant Bit (LSB)',//52
            'Least Significant Bit (LSB)',//53
            'Least Significant Bit (LSB)',//54
            'Least Significant Bit (LSB)',//55
            'Least Significant Bit (LSB)',//56
            'Least Significant Bit (LSB)',//57
            'Least Significant Bit (LSB)',//58
            'Least Significant Bit (LSB)',//59
            'Least Significant Bit (LSB)',//60
            'Least Significant Bit (LSB)',//61
            'Least Significant Bit (LSB)',//62
            'Least Significant Bit (LSB)',//63
            'Damper Pedal / Sustain Pedal',//64
            'Portamento On/Off Switch',//65
            'Sostenuto On/Off Switch',//66
            'Soft Pedal On/Off Switch',//67
            'Legato FootSwitch',//68
            'Hold 2',//69
            'Sound Controller 1',//70
            'Sound Controller 2',//71
            'Sound Controller 3',//72
            'Sound Controller 4',//73
            'Sound Controller 5',//74
            'Sound Controller 6',//75
            'Sound Controller 7',//76
            'Sound Controller 8',//77
            'Sound Controller 9',//78
            'Sound Controller 10',//79
            'General Purpose Controller',//80
            'General Purpose Controller',//81
            'General Purpose Controller',//82
            'General Purpose Controller',//83
            'Portamento CC Control',//84
            '',//85
            '',//86
            '',//87
            '',//88
            '',//89
            '',//90
            'Effect 1 Depth',//91
            'Effect 2 Depth',//92
            'Effect 3 Depth',//93
            'Effect 4 Depth',//94
            'Effect 5 Depth',//95
            '(+1) Data Increment',//96
            '(-1) Data Decrement',//97
            'Non-Registered Parameter Number LSB (NRPN)',//98
            'Non-Registered Parameter Number MSB (NRPN)',//99
            'Registered Parameter Number LSB (RPN)',//100
            'Registered Parameter Number MSB (RPN)',//101
            '',//102
            '',//103
            '',//104
            '',//105
            '',//106
            '',//107
            '',//108
            '',//109
            '',//110
            '',//111
            '',//112
            '',//113
            '',//114
            '',//115
            '',//116
            '',//117
            '',//118
            '',//119
            'All Sound Off',//120
            'Reset All Controllers',//121
            'Local On/Off Switch',//122
            'All Notes Off',//123
            'Omni Mode Off',//124
            'Omni Mode On',//125
            'Mono Mode',//126
            'Poly Mode'];//127

        this.ins = ['Acoustic Grand Piano',
        'Bright Acoustic Piano',
            'Electric Grand Piano',
            'Honky-tonk Piano',
            'Electric Piano 1',
            'Electric Piano 2',
            'Harpsichord',
            'Clavi',
            'Celesta',
            'Glockenspiel',
            'Music Box',
            'Vibraphone',
            'Marimba',
            'Xylophone',
            'Tubular Bells',
            'Dulcimer',
            'Drawbar Organ',
            'Percussive Organ',
            'Rock Organ',
            'Church Organ',
            'Reed Organ',
            'Accordion',
            'Harmonica',
            'Tango Accordion',
            'Acoustic Guitar (nylon)',
            'Acoustic Guitar (steel)',
            'Electric Guitar (jazz)',
            'Electric Guitar (clean)',
            'Electric Guitar (muted)',
            'Overdriven Guitar',
            'Distortion Guitar',
            'Guitar harmonics',
            'Acoustic Bass',
            'Electric Bass (finger)',
            'Electric Bass (pick)',
            'Fretless Bass',
            'Slap Bass 1',
            'Slap Bass 2',
            'Synth Bass 1',
            'Synth Bass 2',
            'Violin',
            'Viola',
            'Cello',
            'Contrabass',
            'Tremolo Strings',
            'Pizzicato Strings',
            'Orchestral Harp',
            'Timpani',
            'String Ensemble 1',
            'String Ensemble 2',
            'SynthStrings 1',
            'SynthStrings 2',
            'Choir Aahs',
            'Voice Oohs',
            'Synth Voice',
            'Orchestra Hit',
            'Trumpet',
            'Trombone',
            'Tuba',
            'Muted Trumpet',
            'French Horn',
            'Brass Section',
            'SynthBrass 1',
            'SynthBrass 2',
            'Soprano Sax',
            'Alto Sax',
            'Tenor Sax',
            'Baritone Sax',
            'Oboe',
            'English Horn',
            'Bassoon',
            'Clarinet',
            'Piccolo',
            'Flute',
            'Recorder',
            'Pan Flute',
            'Blown Bottle',
            'Shakuhachi',
            'Whistle',
            'Ocarina',
            'Lead 1 (square)',
            'Lead 2 (sawtooth)',
            'Lead 3 (calliope)',
            'Lead 4 (chiff)',
            'Lead 5 (charang)',
            'Lead 6 (voice)',
            'Lead 7 (fifths)',
            'Lead 8 (bass + lead)',
            'Pad 1 (new age)',
            'Pad 2 (warm)',
            'Pad 3 (polysynth)',
            'Pad 4 (choir)',
            'Pad 5 (bowed)',
            'Pad 6 (metallic)',
            'Pad 7 (halo)',
            'Pad 8 (sweep)',
            'FX 1 (rain)',
            'FX 2 (soundtrack)',
            'FX 3 (crystal)',
            'FX 4 (atmosphere)',
            'FX 5 (brightness)',
            'FX 6 (goblins)',
        'FX 7 (echoes)',
        'FX 8 (sci-fi)',
        'Sitar',
        'Banjo',
        'Shamisen',
        'Koto',
        'Kalimba',
        'Bag pipe',
        'Fiddle',
        'Shanai',
        'Tinkle Bell',
        'Agogo',
        'Steel Drums',
        'Woodblock',
        'Taiko Drum',
        'Melodic Tom',
        'Synth Drum',
        'Reverse Cymbal',
        'Guitar Fret Noise',
        'Breath Noise',
        'Seashore',
        'Bird Tweet',
        'Telephone Ring',
        'Helicopter',
        'Applause',
        'Gunshot'];

        this.drums = [
            'Acoustic Bass Drum',
            'Bass Drum 1',
            'Side Stick',
            'Acoustic Snare',
            'Hand Clap',
            'Electric Snare',
            'Low Floor Tom',
            'Closed Hi Hat',
            'High Floor Tom',
            'Pedal Hi-Hat',
            'Low Tom',
            'Open Hi-Hat',
            'Low-Mid Tom',
            'Hi-Mid Tom',
            'Crash Cymbal 1',
            'High Tom',
            'Ride Cymbal 1',
            'Chinese Cymbal',
            'Ride Bell',
            'Tambourine',
            'Splash Cymbal',
            'Cowbell',
            'Crash Cymbal 2',
            'Vibraslap',
            'Ride Cymbal 2',
            'Hi Bongo',
            'Low Bongo',
            'Mute Hi Conga',
            'Open Hi Conga',
            'Low Conga',
            'High Timbale',
            'Low Timbale',
            'High Agogo',
            'Low Agogo',
            'Cabasa',
            'Maracas',
            'Short Whistle',
            'Long Whistle',
            'Short Guiro',
            'Long Guiro',
            'Claves',
            'Hi Wood Block',
            'Low Wood Block',
            'Mute Cuica',
            'Open Cuica',
            'Mute Triangle',
            'Open Triangle'];

    }



    midiNote(midiVal) {
        return ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"][midiVal%12]+(Math.floor(midiVal/12)-1);
    }
}