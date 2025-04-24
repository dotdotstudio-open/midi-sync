import { Clef } from "./clef-context"
import { NoteInfoProps } from "./note-display"

export type NoteDisplayLookupProps = {
  noteOffset: number
  modifier?: 'flat' | 'sharp'
  info: Record<Clef, {text: string} & NoteInfoProps>
}
export const noteLookup: Record<number, NoteDisplayLookupProps> = {

// C 2 ---------------
48: {
  noteOffset: 11,
  info: {
    '𝄞': {
      text: 'Change clef!',
      color: 'red',
    },
    '𝄢': {
      text: '0',
      color: 'red',
    },
    '𝄡': {
      text: '0',
      color: 'black',
    },
  }
  
},////////////////////
  
// C# 2 ---------------
49: {
  noteOffset: 11,
  modifier: "sharp",
  info: {
    '𝄞': {
      text: 'Change clef!',
      color: 'red',
    },
    '𝄢': {
      text: '-1',
      color: 'red',
    },
    '𝄡': {
      text: '-1',
      color: 'black',
    },
  }
  
},////////////////////
  
// D 2 ---------------
50: {
  noteOffset: 10,
  info: {
    '𝄞': {
      text: 'Change clef!',
      color: 'red',
    },
    '𝄢': {
      text: '1',
      color: 'red',
    },
    '𝄡': {
      text: '1',
      color: 'black',
    },
  }
  
},////////////////////
  
// D# 2 ---------------
51: {
  noteOffset: 10,
  modifier: "sharp",
  info: {
    '𝄞': {
      text: 'Change clef!',
      color: 'red',
    },
    '𝄢': {
      text: '2',
      color: 'red',
    },
    '𝄡': {
      text: '-2',
      color: 'black',
    },
  }
  
},////////////////////
  
// E 2 ---------------
52: {
  noteOffset: 9,
  info: {
    '𝄞': {
      text: 'Change clef!',
      color: 'red',
    },
    '𝄢': {
      text: '3',
      color: 'red',
    },
    '𝄡': {
      text: '+2',
      color: 'black',
    },
  }
  
},////////////////////
  
// F 2 ---------------
53: {
  noteOffset: 8,
  info: {
    '𝄞': {
      text: 'Change clef!',
      color: 'red',
    },
    '𝄢': {
      text: '4',
      color: 'red',
    },
    '𝄡': {
      text: '3',
      color: 'black',
    },
  }
  
},////////////////////
  
// F# 2 ---------------
54: {
  noteOffset: 8,
  modifier: "sharp",
  info: {
    '𝄞': {
      text: 'Change clef!',
      color: 'red',
    },
    '𝄢': {
      text: '+4',
      color: 'red',
    },
    '𝄡': {
      text: '+3',
      color: 'black',
    },
  }
  
},////////////////////
  
// G 2 ---------------
55: {
  noteOffset: 7,
  info: {
    '𝄞': {
      text: '0',
      color: 'black',
    },
    '𝄢': {
      text: '0',
      color: 'black',
    },
    '𝄡': {
      text: '0',
      color: 'black',
    },
  }
  
},////////////////////
  
// G# 2 ---------------
56: {
  noteOffset: 7,
  modifier: 'sharp',
  info: {
    '𝄞': {
      text: '-1',
      color: 'black',
    },
    '𝄢': {
      text: '-1',
      color: 'black',
    },
    '𝄡': {
      text: '-1',
      color: 'black',
    },
  }
  
},////////////////////
  
// A 3 ---------------
57: {
  noteOffset: 6,
  info: {
    '𝄞': {
      text: '1',
      color: 'black',
    },
    '𝄢': {
      text: '1',
      color: 'black',
    },
    '𝄡': {
      text: '1',
      color: 'black',
    },
  }
  
},////////////////////
  
// Bb 3 ---------------
58: {
  noteOffset: 5,
  modifier: 'flat',
  info: {
    '𝄞': {
      text: '-2',
      color: 'black',
    },
    '𝄢': {
      text: '2',
      color: 'black',
    },
    '𝄡': {
      text: '-2',
      color: 'black',
    },
  }
  
},////////////////////

// b 3 ---------------
59: {
  noteOffset: 5,
  info: {
    '𝄞': {
      text: '+2',
      color: 'black',
    },
    '𝄢': {
      text: '3',
      color: 'black',
    },
    '𝄡': {
      text: '+2',
      color: 'black',
    },
  }
  
},////////////////////

  // C 3 ---------------
60: {
  noteOffset: 4,
  info: {
    '𝄞': {
      text: '3',
      color: 'black',
    },
    '𝄢': {
      text: '4',
      color: 'black',
    },
    '𝄡': {
      text: '3',
      color: 'black',
    },
  }
  
},////////////////////

// C# 3 ---------------
61: {
  noteOffset: 4,
  modifier: 'sharp',
  info: {
    '𝄞': {
      text: '+3',
      color: 'black',
    },
    '𝄢': {
      text: '+4',
      color: 'black',
    },
    '𝄡': {
      text: '+3',
      color: 'black',
    },
  }
  
},////////////////////

// d 3 ---------------
62: {
  noteOffset: 3,
  info: {
    '𝄞': {
      text: '0',
      color: 'green',
    },
    '𝄢': {
      text: '0',
      color: 'green',
    },
    '𝄡': {
      text: '0',
      color: 'green',
    },
  }
  
},////////////////////

// D# 3 ---------------
63: {
  noteOffset: 3,
  modifier: 'sharp',
  info: {
    '𝄞': {
      text: '-1',
      color: 'green',
    },
    '𝄢': {
      text: '-1',
      color: 'green',
    },
    '𝄡': {
      text: '-1',
      color: 'green',
    },
  }
  
},////////////////////

// e 3 ---------------
64: {
  noteOffset: 2,
  info: {
    '𝄞': {
      text: '1',
      color: 'green',
    },
    '𝄢': {
      text: '1',
      color: 'green',
    },
    '𝄡': {
      text: '1',
      color: 'green',
    },
  }
  
},////////////////////

// f 3 ---------------
65: {
  noteOffset: 1,
  info: {
    '𝄞': {
      text: '-2',
      color: 'green',
    },
    '𝄢': {
      text: '2',
      color: 'green',
    },
    '𝄡': {
      text: '-2',
      color: 'green',
    },
  }
  
},////////////////////

// f# 3 ---------------
66: {
  noteOffset: 1,
  modifier: 'sharp',
  info: {
    '𝄞': {
      text: '+2',
      color: 'green',
    },
    '𝄢': {
      text: '3',
      color: 'green',
    },
    '𝄡': {
      text: '+2',
      color: 'green',
    },
  }
  
},////////////////////

  // g 3 ---------------
  67: {
    noteOffset: 0,
    info: {
      '𝄞': {
        text: '3',
        color: 'green',
      },
      '𝄢': {
        text: '4',
        color: 'green',
      },
      '𝄡': {
        text: '3',
        color: 'green',
      },
    }
    
  },////////////////////

  // g# 3 ---------------
  68: {
    noteOffset: 0,
    modifier: 'sharp',
    info: {
      '𝄞': {
        text: '+3',
        color: 'green',
      },
      '𝄢': {
        text: '+4',
        color: 'green',
      },
      '𝄡': {
        text: '+3',
        color: 'green',
      },
    }
    
  },////////////////////

  //A 440
  69: {
    noteOffset: -1,
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
        text: '4',
        color: 'blue',
      },
      '𝄡': {
        text: '3',
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
        text: '+3',
        color: 'blue',
      },
      '𝄢': {
        text: '+4',
        color: 'blue',
      },
      '𝄡': {
        text: '+3',
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
        text: '',
        color: 'blue',
      },
      '𝄡': {
        text: '',
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
        text: '',
        color: 'blue',
      },
      '𝄡': {
        text: '',
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
        text: '',
        color: 'blue',
      },
      '𝄡': {
        text: '',
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
        text: '',
        color: 'blue',
      },
      '𝄡': {
        text: '',
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
        text: '+2',
        color: 'red',
      },
      '𝄢': {
        text: '',
        color: 'blue',
      },
      '𝄡': {
        text: '',
        color: 'blue',
      },
    }
    
  },////////////////////

  // a 5 ---------------
  81: {
    noteOffset: -8,
    info: {
      '𝄞': {
        text: '3',
        color: 'red',
      },
      '𝄢': {
        text: '',
        color: 'blue',
      },
      '𝄡': {
        text: '',
        color: 'blue',
      },
    }
    
  },////////////////////


  // Bb 5 ---------------
  82: {
    noteOffset: -9,
    modifier: 'flat',
    info: {
      '𝄞': {
        text: '-4',
        color: 'red',
      },
      '𝄢': {
        text: 'Change clef!',
        color: 'blue',
      },
      '𝄡': {
        text: 'Change clef!',
        color: 'blue',
      },
    }
    
  },////////////////////

  // B 5 ---------------
  83: {
    noteOffset: -9,
    info: {
      '𝄞': {
        text: '4',
        color: 'red',
      },
      '𝄢': {
        text: 'Change clef!',
        color: 'blue',
      },
      '𝄡': {
        text: 'Change clef!',
        color: 'blue',
      },
    }
    
  },////////////////////

  // c 5 ---------------
  84: {
    noteOffset: -10,
    info: {
      '𝄞': {
        text: '',
        color: 'blue',
      },
      '𝄢': {
        text: 'Change clef!',
        color: 'blue',
      },
      '𝄡': {
        text: 'Change clef!',
        color: 'blue',
      },
    }
    
  },////////////////////

  // c# 5 ---------------
  85: {
    noteOffset: -10,
    modifier: "sharp",
    info: {
      '𝄞': {
        text: '',
        color: 'blue',
      },
      '𝄢': {
        text: 'Change clef!',
        color: 'blue',
      },
      '𝄡': {
        text: 'Change clef!',
        color: 'blue',
      },
    }
    
  },////////////////////

  // D 5 ---------------
  86: {
    noteOffset: -11,
    info: {
      '𝄞': {
        text: '',
        color: 'blue',
      },
      '𝄢': {
        text: 'Change clef!',
        color: 'blue',
      },
      '𝄡': {
        text: 'Change clef!',
        color: 'blue',
      },
    }
    
  },////////////////////

  // D# 5 ---------------
  87: {
    noteOffset: -11,
    modifier: "sharp",
    info: {
      '𝄞': {
        text: '1',
        color: 'blue',
      },
      '𝄢': {
        text: 'Change clef!',
        color: 'blue',
      },
      '𝄡': {
        text: 'Change clef!',
        color: 'blue',
      },
    }
    
  },////////////////////

  // E 5 ---------------
  88: {
    noteOffset: -12,
    info: {
      '𝄞': {
        text: '',
        color: 'blue',
      },
      '𝄢': {
        text: 'Change clef!',
        color: 'blue',
      },
      '𝄡': {
        text: 'Change clef!',
        color: 'blue',
      },
    }
    
  }////////////////////


  
  
}