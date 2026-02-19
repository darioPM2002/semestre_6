import React from 'react'

const Card = ({ id, name, sprites = [] }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '400px',
      margin: '20px auto',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: 'white',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#a0c4ff',
        marginBottom: '16px',
        textTransform: 'capitalize',
        letterSpacing: '1px',
      }}>
        #{id} — {name}
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        {sprites.map(sprite => (
          sprite && (
            <img
              src={sprite}
              key={sprite}
              alt={name}
              style={{
                width: '100%',
                maxWidth: '340px',
                height: '220px',
                objectFit: 'cover',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            />
          )
        ))}
      </div>
    </div>
  )
}

export default Card