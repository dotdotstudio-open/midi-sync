import { ReactNode } from "react"
import styled from "styled-components"
import { Clef, ClefOffsets, useClef } from "./clef-context"

export type NoteDisplayProps = {
  noteId: number
  duration: 'short' | 'long'
  velocity: number
}

const NotesContainer = styled.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 50,
  height: 50,
  fontFamily: 'NotoMusic',
  transform: 'translate(-90%, -50%) scale(2)'
})

const StaffLayer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
  transform: 'translate(25%, 0)'
})

const LedgerLayer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
  transform: 'translate(50%, 100%) scaleX(0.5)'
})


type NoteLayerProps = {
  noteOffset: number
  children: ReactNode
}

const NoteLayer = styled.div<NoteLayerProps>({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
}, props => ({
  transform: `translate(54%, ${props.noteOffset * 12}%)`
}))

const NoteModifierLayer = styled.div<NoteLayerProps>({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
}, props => ({
  transform: `translate(8%, ${props.noteOffset * 12}%)`
}))

const NoteSpeedLayer = styled.div<NoteLayerProps>({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
}, props => ({
  transform: `translate(54%, ${96 + (props.noteOffset * 12)}%)`
}))

type NoteInfoProps = {
  color: 'red' | 'black' | 'blue' | 'green'
}
const NoteInfoLayer = styled.div<NoteInfoProps & {children: ReactNode}>({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 35,
  transform: `translate(25%, -120%)`
}, props => ({
  color: props.color
}))

const ClefLayer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  fontSize: 50,
  transform: 'translate(-55%, 0)'
})

const getNoteVelocitySymbol = (velocity: number) => {
  if (velocity < 33) {
    return '𝆏𝆏'
  } else if (velocity < 49) {
    return '𝆏'
  } else if (velocity < 64) {
    return '𝆐𝆏'
  } else if (velocity < 80) {
    return '𝆐𝆑'
  } else if (velocity < 96) {
    return '𝆑'
  } else {
    return '𝆑𝆑'
  }
}

type NoteDisplayLookupProps = {
  noteOffset: number
  modifier?: 'flat' | 'sharp'
  info: Record<Clef, {text: string} & NoteInfoProps>
}
const noteLookup: Record<number, NoteDisplayLookupProps> = {
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

export const NoteDisplay = ({
  noteId,
  duration,
  velocity,
}: NoteDisplayProps) => {

  const clef = useClef()

  const noteOffset = noteLookup[noteId]?.noteOffset ? noteLookup[noteId].noteOffset + ClefOffsets[clef] : undefined

  return (
    <NotesContainer>
      <StaffLayer>
        {'𝄚'}
      </StaffLayer>
      <LedgerLayer>
        {noteOffset && noteOffset < -4 ? '𝄘' : ''}
      </LedgerLayer>
      <ClefLayer>
        {clef}
      </ClefLayer>
      <NoteLayer noteOffset={noteOffset || 0}>
        {noteId ? '𝅘' : ''}
      </NoteLayer>
      <NoteModifierLayer noteOffset={noteOffset || 0}>
        {noteLookup[noteId]?.modifier === 'flat' ? 
          '♭'
        : noteLookup[noteId]?.modifier === 'sharp' ?
          '♯'
        :
          ''
        }
      </NoteModifierLayer>
      <NoteSpeedLayer noteOffset={noteOffset || 0}>
        {getNoteVelocitySymbol(velocity)}
      </NoteSpeedLayer>
      <NoteInfoLayer color={noteLookup[noteId]?.info[clef].color || 'black'}>
        {noteLookup[noteId]?.info[clef].text || ''}
      </NoteInfoLayer>
    </NotesContainer>
  )
}