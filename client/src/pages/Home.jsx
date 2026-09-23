export default function Home() {
    return (
      <>
        <header className="top-bar">
          <div className="brand">
            <div className="wake-logo">W</div>
  
            <div className="brand-text">
              <span className="protocol-label">
                <span className="status-dot" />
                WAKE // PROTOCOL
              </span>
              <h1>WAKE HUD</h1>
            </div>
          </div>
  
          <div className="live-time">
            <span>10:42</span>
            <small>PM</small>
          </div>
        </header>
  
        <main className="main-content">
          <div className="home-content">
  
            {/* Next Alarm */}
            <section className="alarm-hero">
              <div className="ambient-glow glow-top" />
              <div className="ambient-glow glow-bottom" />
  
              <div className="hero-content">
                <div className="hero-status-row">
                  <div className="status-badge">
                    <span className="status-dot" />
                    Next Alarm in 6h 42m
                  </div>
  
                  <span className="repeat-label">
                    Mon — Fri
                  </span>
                </div>
  
                <div className="alarm-time-row">
                  <div className="alarm-time">
                    <span>06:30</span>
                    <strong>AM</strong>
                  </div>
  
                  <div className="alarm-icon-box">
                    <span>⏰</span>
                  </div>
                </div>
  
                <div className="challenge-row">
                  <div className="challenge-pill">
                    <span>⌁</span>
                    Math (3x Medium)
                  </div>
                </div>
              </div>
            </section>
  
            {/* Consistency */}
            <section className="stat-card">
              <div className="stat-header">
                <span>CONSISTENCY</span>
                <span className="stat-icon">🔥</span>
              </div>
  
              <div className="stat-value">
                <strong>7</strong>
                <span>days</span>
              </div>
  
              <div className="streak-bars">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
  
              <span className="stat-footer">
                Personal best: 14d
              </span>
            </section>
  
            {/* Sleep Window */}
            <section className="sleep-card">
              <div className="sleep-header">
                <div className="status-badge">
                  <span className="status-dot" />
                  Protocol Status // Optimal Sleep Window
                </div>
  
                <span className="stat-icon">☾</span>
              </div>
  
              <div className="sleep-main">
                <div>
                  <div className="target-sleep">
                    <span>Target Sleep:</span>
                    <strong>10:45</strong>
                    <b>PM</b>
                  </div>
  
                  <p>7h 45m calculated rest cycle</p>
                </div>
  
                <div className="sleep-icon-box">
                  ☾
                </div>
              </div>
  
              <div className="sleep-details">
                <div>
                  <span>DISARM TEST</span>
                  <strong>Verified (Math 3x)</strong>
                </div>
  
                <div>
                  <span>ACOUSTIC GAIN</span>
                  <strong>98dB Max</strong>
                </div>
              </div>
            </section>
  
          </div>
        </main>
      </>
    )
  }