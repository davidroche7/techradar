* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f5f7fa;
    color: #2d3748;
    line-height: 1.6;
}

.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem 0;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.header p {
    font-size: 1.1rem;
    opacity: 0.9;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.nav-tabs {
    display: flex;
    background: white;
    border-radius: 8px;
    margin: 2rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: hidden;
}

.nav-tab {
    flex: 1;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    background: #f8f9fa;
    border: none;
    transition: all 0.3s ease;
    font-size: 1rem;
    font-weight: 500;
}

.nav-tab.active {
    background: #667eea;
    color: white;
}

.nav-tab:hover:not(.active) {
    background: #e2e8f0;
}

.content {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
}

.tab-content {
    display: none;
    padding: 2rem;
}

.tab-content.active {
    display: block;
}

.tech-radar-view {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
    align-items: start;
}

.radar-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

#radar-chart {
    width: 100%;
    height: 600px;
}

.radar-legend {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
}

.legend-section {
    margin-bottom: 1.5rem;
}

.legend-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #2d3748;
}

.legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.legend-item:hover {
    background: #e2e8f0;
}

.legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 0.5rem;
}

.legend-dot.adopt { background-color: #48bb78; }
.legend-dot.trial { background-color: #4299e1; }
.legend-dot.assess { background-color: #ed8936; }
.legend-dot.hold { background-color: #f56565; }

.search-container {
    margin-bottom: 2rem;
}

.search-input {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

.search-input:focus {
    outline: none;
    border-color: #667eea;
}

.asset-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.asset-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    cursor: pointer;
}

.asset-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transform: translateY(-2px);
}

.asset-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1rem;
}

.asset-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #2d3748;
}

.asset-status {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
}

.status-adopt { background: #c6f6d5; color: #22543d; }
.status-trial { background: #bee3f8; color: #2c5282; }
.status-assess { background: #fef2b3; color: #744210; }
.status-hold { background: #fed7d7; color: #742a2a; }

.filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.filter-select {
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background: white;
}

.integration-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.integration-card {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
}

.integration-card h3 {
    color: #667eea;
    margin-bottom: 1rem;
}

.integration-card ul {
    color: #4a5568;
    line-height: 1.8;
    padding-left: 1.5rem;
}

.workflow-section {
    background: #edf2f7;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
}

.workflow-section h3 {
    color: #2d3748;
    margin-bottom: 1rem;
}

.workflow-section ol {
    color: #4a5568;
    line-height: 1.8;
    padding-left: 1.5rem;
}

.action-buttons {
    text-align: center;
    padding: 2rem;
}

.btn-primary, .btn-secondary {
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    margin: 0 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.btn-primary {
    background: #667eea;
    color: white;
}

.btn-primary:hover {
    background: #5a67d8;
}

.btn-secondary {
    background: #48bb78;
    color: white;
}

.btn-secondary:hover {
    background: #38a169;
}

/* Tooltip styles */
.tooltip {
    position: absolute;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
    pointer-events: none;
    z-index: 1000;
}

/* Modal styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    margin: 1rem;
}

@media (max-width: 768px) {
    .tech-radar-view {
        grid-template-columns: 1fr;
    }
    
    .asset-grid {
        grid-template-columns: 1fr;
    }
    
    .filters {
        flex-direction: column;
    }
    
    .integration-grid {
        grid-template-columns: 1fr;
    }
    
    .nav-tabs {
        flex-direction: column;
    }
    
    .header h1 {
        font-size: 2rem;
    }
}
