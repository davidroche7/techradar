let assetsData = null;
let filteredAssets = [];

async function loadAssetsData() {
    try {
        const response = await fetch('data/assets-data.json');
        const data = await response.json();
        assetsData = data.assets;
        filteredAssets = [...assetsData];
        renderAssets();
    } catch (error) {
        console.error('Error loading assets data:', error);
    }
}

function renderAssets() {
    const grid = document.getElementById('asset-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    filteredAssets.forEach(asset => {
        const card = document.createElement('div');
        card.className = 'asset-card';
        card.onclick = () => showAssetDetails(asset);
        
        card.innerHTML = `
            <div class="asset-header">
                <div class="asset-name">${asset.name}</div>
                <div class="asset-status status-${asset.status}">${asset.status}</div>
            </div>
            <p style="color: #718096; margin-bottom: 1rem;">${asset.description}</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
                <div>
                    <div style="font-size: 0.8rem; color: #718096; margin-bottom: 0.25rem;">Category</div>
                    <div style="font-weight: 500;">${asset.category}</div>
                </div>
                <div>
                    <div style="font-size: 0.8rem; color: #718096; margin-bottom: 0.25rem;">Owner</div>
                    <div style="font-weight: 500;">${asset.owner}</div>
                </div>
                <div>
                    <div style="font-size: 0.8rem; color: #718096; margin-bottom: 0.25rem;">Systems</div>
                    <div style="font-weight: 500;">${asset.systems.length} systems</div>
                </div>
                <div>
                    <div style="font-size: 0.8rem; color: #718096; margin-bottom: 0.25rem;">Adoption</div>
                    <div style="font-weight: 500;">${asset.metrics.adoption}</div>
                </div>
            </div>
            
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
                ${asset.tags.map(tag => `<span style="background: #edf2f7; color: #4a5568; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">${tag}</span>`).join('')}
            </div>
            
            <div style="margin-top: 1rem;">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Recent Deployments:</div>
                ${asset.systems.slice(0, 3).map(system => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; background: #f8f9fa;">
                        <div>
                            <div style="font-weight: 500;">${system.name}</div>
                            <div style="font-size: 0.8rem; color: #718096;">${system.environment} • ${system.lastDeployed}</div>
                        </div>
                        <div style="color: #718096; font-size: 0.9rem;">${system.version}</div>
                    </div>
                `).join('')}
                ${asset.systems.length > 3 ? `<div style="text-align: center; color: #718096; font-size: 0.9rem;">+${asset.systems.length - 3} more systems</div>` : ''}
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function showAssetDetails(asset) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
            <h2>${asset.name}</h2>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #f56565; color: white; border: none; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">Close</button>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
            <div>
                <h4>Status</h4>
                <span class="asset-status status-${asset.status}">${asset.status}</span>
            </div>
            <div>
                <h4>Category</h4>
                <p>${asset.category}</p>
            </div>
            <div>
                <h4>Owner</h4>
                <p>${asset.owner}</p>
            </div>
            <div>
                <h4>Support Level</h4>
                <p>${asset.supportLevel}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4>Description</h4>
            <p>${asset.description}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4>Compliance Status</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
                <div>Security: <strong>${asset.compliance.security}</strong></div>
                <div>Licensing: <strong>${asset.compliance.licensing}</strong></div>
                <div>Data Privacy: <strong>${asset.compliance.dataPrivacy}</strong></div>
            </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4>Key Metrics</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
                <div>Adoption: <strong>${asset.metrics.adoption}</strong></div>
                <div>Incidents (30d): <strong>${asset.metrics.incidents}</strong></div>
                <div>Uptime: <strong>${asset.metrics.uptime}</strong></div>
            </div>
        </div>
        
        <div>
            <h4>All Systems (${asset.systems.length})</h4>
            <div style="max-height: 200px; overflow-y: auto;">
                ${asset.systems.map(system => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 4px; margin-bottom: 0.5rem;">
                        <div>
                            <div style="font-weight: 500;">${system.name}</div>
                            <div style="font-size: 0.8rem; color: #718096;">${system.environment} • Last deployed: ${system.lastDeployed}</div>
                        </div>
                        <div style="color: #718096; font-size: 0.9rem;">${system.version}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        ${asset.documentation ? `
            <div style="margin-top: 1rem; text-align: center;">
                <a href="${asset.documentation}" target="_blank" style="background: #667eea; color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 4px; display: inline-block;">View Documentation</a>
            </div>
        ` : ''}
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function filterAssets(searchTerm) {
    if (!assetsData) return;
    
    filteredAssets = assetsData.filter(asset => {
        const searchLower = searchTerm.toLowerCase();
        return asset.name.toLowerCase().includes(searchLower) ||
               asset.description.toLowerCase().includes(searchLower) ||
               asset.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
               asset.systems.some(system => system.name.toLowerCase().includes(searchLower));
    });
    renderAssets();
}

function filterByStatus(status) {
    if (!assetsData) return;
    
    if (status === '') {
        filteredAssets = [...assetsData];
    } else {
        filteredAssets = assetsData.filter(asset => asset.status === status);
    }
    renderAssets();
}

function filterByCategory(category) {
    if (!assetsData) return;
    
    if (category === '') {
        filteredAssets = [...assetsData];
    } else {
        filteredAssets = assetsData.filter(asset => asset.category === category);
    }
    renderAssets();
}

function filterAssetsByStatus(status) {
    showTab('registry');
    setTimeout(() => {
        filterByStatus(status);
    }, 100);
}

function filterAssetsByCategory(category) {
    showTab('registry');
    setTimeout(() => {
        filterByCategory(category);
    }, 100);
}

// Global functions for tab switching
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all nav tabs
    document.querySelectorAll('.nav-tab').forEach(nav => {
        nav.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to selected nav tab
    const activeTab = Array.from(document.querySelectorAll('.nav-tab')).find(tab => 
        tab.textContent.toLowerCase().includes(tabName.toLowerCase())
    );
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Initialize asset grid if registry tab is selected
    if (tabName === 'registry' && assetsData) {
        renderAssets();
    }
}
