import {FC, memo} from 'react'

export const ContextMenu = memo(
    ({ isOpen, position, actions = [], onMouseLeave }) =>
      isOpen ? (
        <div
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            zIndex: 1000,
            border: 'solid 1px #CCC',
            borderRadius: 3,
            backgroundColor: 'white',
            padding: 5,
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseLeave={onMouseLeave}
        >
          {actions.map((action) => (
            <button key={action.label} onClick={action.effect}>
              {action.label}
            </button>
          ))}
        </div>
      ) : null
);