import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

// Assume this import works in your environment
import nibiImage from "/baseimg_copy-removebg-preview.png";

const CATEGORIES = [
  { 
    name: 'Hats', 
    path: 'Hats_head', 
    stateKey: 'hat', 
    zIndex: 50,
    style: {
      position: 'absolute',
      top: '2%',
      left: '28%',
      width: '58%',
    },
    fileExtension: '.png'
  },
  { 
    name: 'Background', 
    path: 'Background', 
    stateKey: 'background', 
    zIndex: 10,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    fileExtension: '.jpeg'
  },
  { 
    name: 'Glasses', 
    path: 'Outfit', 
    stateKey: 'outfit', 
    zIndex: 40,
    style: {
      position: 'absolute',
      top: '15%',
      left: '42%',
      width: '52%',
    },
    fileExtension: '.png'
  },
  { 
    name: 'Bow tie', 
    path: 'bowties', 
    stateKey: 'bowtie', 
    zIndex: 40,
    style: {
      position: 'absolute',
      top: '48%',
      left: '53%',
      width: '27%',
    },
    fileExtension: '.png'
  },
];

const itemIndices = [1, 2, 3, 4, 5];

export default function App() {
  const [selectedItems, setSelectedItems] = useState({
    hat: null,
    background: null,
    outfit: null,
    bowtie: null
  });
  
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].name);
  const nibiDisplayRef = useRef(null);

  const resetNibi = () => {
    setSelectedItems({
      hat: null,
      background: null,
      outfit: null,
      bowtie: null
    });
  };

  const generateRandom = () => {
    const newItems = {};
    CATEGORIES.forEach(category => {
      newItems[category.stateKey] = `/assets/Meme Maker Items/${category.path}/${Math.floor(Math.random() * 5) + 1}${category.fileExtension}`;
    });
    setSelectedItems(newItems);
  };

  const downloadNibi = () => {
    if (!nibiDisplayRef.current) return;
    
    html2canvas(nibiDisplayRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'my-custom-nibi.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #E6F0FF 0%, #B3D9FF 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#1A365D',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          Nibi Meme Maker
        </h1>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          '@media (min-width: 1024px)': {
            flexDirection: 'row'
          }
        }}>
          {/* Left side - Nibi display and buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <div ref={nibiDisplayRef} style={{
              position: 'relative',
              width: '300px',
              height: '300px',
              border: '4px solid #1A365D',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              background: 'white'
            }}>
              {/* Render background first */}
              {selectedItems.background && (
                <img
                  src={selectedItems.background}
                  alt="Background"
                  style={CATEGORIES.find(c => c.stateKey === 'background').style}
                />
              )}
              
              {/* Nibi base image */}
              <img
                src={nibiImage}
                alt="Nibi base"
                style={{
                  position: 'absolute',
                  zIndex: 30,
                  bottom: '-48px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '90%'
                }}
              />
              
              {/* Render accessories on top of Nibi */}
              {CATEGORIES.filter(cat => cat.stateKey !== 'background').map(category => 
                selectedItems[category.stateKey] && (
                  <img
                    key={category.stateKey}
                    src={selectedItems[category.stateKey]}
                    alt={category.name}
                    style={{
                      ...category.style,
                      zIndex: category.zIndex,
                    }}
                  />
                )
              )}
            </div>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              width: '100%',
              maxWidth: '300px'
            }}>
              <ActionButton onClick={resetNibi} style={{backgroundColor: '#E6F0FF', color: '#1A365D'}}>
                Reset
              </ActionButton>
              <ActionButton onClick={generateRandom} style={{backgroundColor: '#1A365D', color: '#E6F0FF'}}>
                Random
              </ActionButton>
            </div>
            
            <ActionButton onClick={downloadNibi} style={{
              width: '100%',
              maxWidth: '300px',
              backgroundColor: '#2C5282',
              color: 'white'
            }}>
              Download
            </ActionButton>
          </div>

          {/* Right side - Item selection */}
          <div style={{
            flex: 1,
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              borderBottom: '2px solid #E2E8F0'
            }}>
              {CATEGORIES.map(category => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  style={{
                    padding: '1rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    backgroundColor: activeCategory === category.name ? '#1A365D' : 'transparent',
                    color: activeCategory === category.name ? 'white' : '#1A365D',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div style={{padding: '1.5rem'}}>
              {CATEGORIES.map(category => (
                <div key={category.name} 
                     style={{display: activeCategory === category.name ? 'block' : 'none'}}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                    gap: '1rem'
                  }}>
                    <ItemButton
                      onClick={() => {
                        setSelectedItems(prev => ({...prev, [category.stateKey]: null}));
                      }}
                    >
                      X
                    </ItemButton>

                    {itemIndices.map(index => (
                      <ItemButton
                        key={index}
                        onClick={() => {
                          setSelectedItems(prev => ({
                            ...prev,
                            [category.stateKey]: `/assets/Meme Maker Items/${category.path}/${index}${category.fileExtension}`
                          }));
                        }}
                        style={{
                          border: selectedItems[category.stateKey]?.includes(String(index))
                            ? '2px solid #1A365D'
                            : '2px solid #E2E8F0'
                        }}
                      >
                        <img 
                          src={`/assets/Meme Maker Items/${category.path}/${index}${category.fileExtension}`}
                          alt={`${category.name} ${index}`}
                          style={{width: '100%', height: '100%', objectFit: 'contain'}}
                        />
                      </ItemButton>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ children, style, ...props }) {
  return (
    <button
      style={{
        flex: 1,
        padding: '0.75rem 1rem',
        border: '2px solid #1A365D',
        borderRadius: '9999px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function ItemButton({ children, style, ...props }) {
  return (
    <button
      style={{
        aspectRatio: '1 / 1',
        border: '2px solid #E2E8F0',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}