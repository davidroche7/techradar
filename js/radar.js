let radarData = null;

async function loadRadarData() {
    try {
        const response = await fetch('data/radar-data.json');
        radarData = await response.json();
        renderRadar();
    } catch (error) {
        console.error('Error loading radar data:', error);
    }
}

function renderRadar() {
    if (!radarData) return;

    const container = d3.select("#radar-chart");
    container.selectAll("*").remove();

    const width = 600;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 40;

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);

    // Draw rings
    const rings = [0.25, 0.5, 0.75, 1.0];
    rings.forEach((ring, index) => {
        svg.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", ring * maxRadius)
            .attr("fill", "none")
            .attr("stroke", "#e2e8f0")
            .attr("stroke-width", 2);
    });

    // Draw quadrant lines
    svg.append("line")
        .attr("x1", centerX)
        .attr("y1", 0)
        .attr("x2", centerX)
        .attr("y2", height)
        .attr("stroke", "#e2e8f0")
        .attr("stroke-width", 2);

    svg.append("line")
        .attr("x1", 0)
        .attr("y1", centerY)
        .attr("x2", width)
        .attr("y2", centerY)
        .attr("stroke", "#e2e8f0")
        .attr("stroke-width", 2);

    // Add quadrant labels
    const quadrantLabels = [
        { text: "Platforms", x: centerX + maxRadius/2, y: 30 },
        { text: "Tools", x: centerX - maxRadius/2, y: 30 },
        { text: "Techniques", x: centerX - maxRadius/2, y: height - 10 },
        { text: "Languages", x: centerX + maxRadius/2, y: height - 10 }
    ];

    quadrantLabels.forEach(label => {
        svg.append("text")
            .attr("x", label.x)
            .attr("y", label.y)
            .attr("text-anchor", "middle")
            .attr("fill", "#4a5568")
            .attr("font-size", "14")
            .attr("font-weight", "600")
            .text(label.text);
    });

    // Add ring labels
    const ringLabels = ["ADOPT", "TRIAL", "ASSESS", "HOLD"];
    ringLabels.forEach((label, index) => {
        svg.append("text")
            .attr("x", centerX + 10)
            .attr("y", centerY - (rings[index] * maxRadius) + 5)
            .attr("fill", "#4a5568")
            .attr("font-size", "12")
            .text(label);
    });

    // Plot technologies
    radarData.technologies.forEach((tech, index) => {
        const quadrantIndex = radarData.quadrants.findIndex(q => q.id === tech.quadrant);
        const ringIndex = radarData.rings.findIndex(r => r.id === tech.ring);
        
        // Calculate position
        const angle = (quadrantIndex * 90 + Math.random() * 80 + 10) * Math.PI / 180;
        const radius = (ringIndex * 0.25 + 0.125 + Math.random() * 0.2) * maxRadius;
        
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        const ringColor = radarData.rings[ringIndex].color;
        
        // Add technology dot
        const dot = svg.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 8)
            .attr("fill", ringColor)
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .style("cursor", "pointer")
            .on("click", () => showTechDetails(tech))
            .on("mouseover", function() {
                d3.select(this).attr("r", 12);
                showTooltip(tech, x, y);
            })
            .on("mouseout", function() {
                d3.select(this).attr("r", 8);
                hideTooltip();
            });

        // Add technology number
        svg.append("text")
            .attr("x", x)
            .attr("y", y + 4)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-size", "10")
            .attr("font-weight", "bold")
            .style("pointer-events", "none")
            .text(index + 1);
    });
}

function showTechDetails(tech) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
            <h2>${tech.name}</h2>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #f56565; color: white; border: none; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">Close</button>
        </div>
        
        <div style="margin-bottom: 1rem;">
            <strong>Status:</strong> <span class="asset-status status-${tech.ring}">${tech.ring.toUpperCase()}</span>
        </div>
        
        <div style="margin-bottom: 1rem;">
            <strong>Category:</strong> ${tech.quadrant}
        </div>
        
        <div style="margin-bottom: 1rem;">
            <strong>Description:</strong><br/>
            ${tech.description}
        </div>
        
        <div style="margin-bottom: 1rem;">
            <strong>Rationale:</strong><br/>
            ${tech.rationale}
        </div>
        
        ${tech.moved !== 0 ? `
            <div style="margin-bottom: 1rem;">
                <strong>Movement:</strong> ${tech.moved > 0 ? 'Moved outward (towards ADOPT)' : 'Moved inward (towards HOLD)'}
            </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 2rem;">
            <button onclick="showAssetDetailsForTech('${tech.name.toLowerCase()}')" style="background: #48bb78; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;">View in Asset Registry</button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function showAssetDetailsForTech(techName) {
    // Close current modal
    document.querySelectorAll('.modal').forEach(modal => modal.remove());
    
    // Switch to asset registry tab
    showTab('registry');
    
    // Filter assets by the technology name
    setTimeout(() => {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = techName;
            filterAssets(techName);
        }
    }, 100);
}

function showTooltip(tech, x, y) {
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .html(`<strong>${tech.name}</strong><br/>${tech.description}`)
        .style("left", (x + 10) + "px")
        .style("top", (y - 10) + "px");
}

function hideTooltip() {
    d3.selectAll(".tooltip").remove();
}
