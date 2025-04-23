import { Clef } from "./clef-context"
import { NoteInfoProps } from "./note-display"

export type NoteDisplayLookupProps = {
  noteOffset: number
  modifier?: 'flat' | 'sharp'
  info: Record<Clef, {text: string} & NoteInfoProps>
}
export const noteLookup: Record<number, NoteDisplayLookupProps> = {
  //A 440
  69: {
    noteOffset: -1,
    //modifier: 'flat',
    info: {
      '𝄞': {
        text: 'A0',
        color: 'blue',
      },
      '𝄢': {
        text: 'A0',
        color: 'blue',
      },
      '𝄡': {
        text: 'A0',
        color: 'blue',
      },
    }
  },
  //B flat 4
  70: {
    noteOffset: -2,
    modifier: 'flat',
    info: {
      '𝄞': {
        text: '-1',
        color: 'blue',
      },
      '𝄢': {
        text: '-1',
        color: 'blue',
      },
      '𝄡': {
        text: '-1',
        color: 'blue',
      },
    }
  },
  // B 4 ---------------
  71: {
    noteOffset: -2,
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // C 4 ---------------
  72: {
    noteOffset: -3,
    info: {
      '𝄞': {
        text: '-2',
        color: 'blue',
      },
      '𝄢': {
        text: '2',
        color: 'blue',
      },
      '𝄡': {
        text: '-2',
        color: 'blue',
      },
    }
    
  },////////////////////

  // C# 4 ---------------
  73: {
    noteOffset: -3,
    modifier: 'sharp',
    info: {
      '𝄞': {
        text: '+2',
        color: 'blue',
      },
      '𝄢': {
        text: '3',
        color: 'blue',
      },
      '𝄡': {
        text: '+2',
        color: 'blue',
      },
    }
    
  },////////////////////

  // D 4 ---------------
  74: {
    noteOffset: -4,
    info: {
      '𝄞': {
        text: '3',
        color: 'blue',
      },
      '𝄢': {
        text: '3',
        color: 'blue',
      },
      '𝄡': {
        text: '+2',
        color: 'blue',
      },
    }
    
  },////////////////////

  // D# 4 ---------------
  75: {
    noteOffset: -4,
    modifier: 'sharp',
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // E 4 ---------------
  76: {
    noteOffset: -5,
    info: {
      '𝄞': {
        text: 'E',
        color: 'red',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // f 4 ---------------
  77: {
    noteOffset: -6,
    info: {
      '𝄞': {
        text: '-1',
        color: 'red',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // F# 4 ---------------
  78: {
    noteOffset: -6,
    modifier: 'sharp',
    info: {
      '𝄞': {
        text: '1',
        color: 'red',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // g 4 ---------------
  79: {
    noteOffset: -7,
    info: {
      '𝄞': {
        text: '-2',
        color: 'red',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // G# 4 ---------------
  80: {
    noteOffset: -7,
    modifier: 'sharp',
    info: {
      '𝄞': {
        text: '2',
        color: 'red',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // a 5 ---------------
  81: {
    noteOffset: -3,
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////
/*

  // B 4 ---------------
  71: {
    noteOffset: -3,
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // B 4 ---------------
  71: {
    noteOffset: -3,
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // B 4 ---------------
  71: {
    noteOffset: -3,
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // B 4 ---------------
  71: {
    noteOffset: -3,
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // B 4 ---------------
  71: {
    noteOffset: -3,
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // B 4 ---------------
  71: {
    noteOffset: -3,
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // B 4 ---------------
  71: {
    noteOffset: -3,
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // B 4 ---------------
  71: {
    noteOffset: -3,
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // B 4 ---------------
  71: {
    noteOffset: -3,
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  // B 4 ---------------
  71: {
    noteOffset: -3,
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: '1',
        color: 'blue',
      },
      '𝄡': {
        text: '1',
        color: 'blue',
      },
    }
    
  },////////////////////

  */
  
}