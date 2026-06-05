// Java DSA Prep Dashboard Controller (Light Sky-Blue & 3D edition)

// --- STATE MANAGEMENT ---
let state = {
    selectedProblemId: null,
    activeTabId: "overview",
    solvedProblems: new Set(),
    problemNotes: {},
    searchTerm: "",
    activeFilter: "all"
};

// --- INITIALIZE APP ---
document.addEventListener("DOMContentLoaded", () => {
    loadStateFromStorage();
    initDOMListeners();
    renderSidebar();
    
    // Select first problem by default
    if (TOP_150_PROBLEMS.length > 0) {
        selectProblem(TOP_150_PROBLEMS[0].id);
    }
    
    updateGlobalProgress();
    
    // Deploy Secure FOOTER footprint signature with self-healing guards
    // Removed tamper lock

    // Auto-Hide Hover / Slide Sidebar
    document.addEventListener("mousemove", (e) => {
        const sidebar = document.querySelector(".sidebar");
        if (!sidebar) return;
        if (e.clientX < 25) {
            sidebar.classList.add("active");
        } else if (e.clientX > 300) {
            sidebar.classList.remove("active");
        }
    });
});

// --- STORAGE HANDLERS ---
function loadStateFromStorage() {
    try {
        const storedSolved = localStorage.getItem("lc_dsa_solved");
        if (storedSolved) {
            state.solvedProblems = new Set(JSON.parse(storedSolved));
        } else {
            state.solvedProblems = new Set();
            saveSolvedToStorage();
        }
    } catch (e) {
        console.error("Storage loading failed", e);
    }
}

function saveSolvedToStorage() {
    localStorage.setItem("lc_dsa_solved", JSON.stringify([...state.solvedProblems]));
}

// --- DOM INTERACTORS ---
function initDOMListeners() {
    // Search input handler
    const searchInput = document.getElementById("sidebar-search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            state.searchTerm = e.target.value.toLowerCase();
            renderSidebar();
        });
    }
    
    // Tab switching
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");
            switchTab(tabId);
        });
    });
    
    // Solved check switch toggle
    const solvedToggle = document.getElementById("solved-toggle-btn");
    if (solvedToggle) {
        solvedToggle.addEventListener("click", () => {
            toggleProblemSolvedState();
        });
    }
    
    // Copy code button handler
    const copyBtn = document.getElementById("copy-code-btn");
    if (copyBtn) {
        copyBtn.addEventListener("click", () => copyCurrentCode());
    }
    
    // Copy brute force code button handler
    const copyBruteBtn = document.getElementById("copy-brute-code-btn");
    if (copyBruteBtn) {
        copyBruteBtn.addEventListener("click", () => copyBruteCode());
    }



    // Topic filtering chips
    document.querySelectorAll(".topic-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            document.querySelectorAll(".topic-chip").forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            state.activeFilter = chip.getAttribute("data-filter");
            renderSidebar();
        });
    });
}

// --- JAVA SOLUTION REFRESH ---
function refreshCodeTab() {
    const id = state.selectedProblemId;
    if (!id) return;
    const problem = TOP_150_PROBLEMS.find(p => p.id === id);
    if (!problem) return;

    const optCode = problem.javaCode || generateOptimalJavaCode(problem);
    const bruteCode = problem.bruteForceCode || generateBruteForceJavaCode(problem);

    const optBlock = document.getElementById("code-display-block");
    if (optBlock) optBlock.textContent = optCode;

    const bruteBlock = document.getElementById("brute-code-display-block");
    if (bruteBlock) bruteBlock.textContent = bruteCode || "// Optimal solution is straightforward. Use Java template directly.";
}

// --- SIDEBAR RENDERING (Dynamic grouping by Category) ---
function renderSidebar() {
    const listContainer = document.getElementById("sidebar-problems-list");
    if (!listContainer) return;
    
    listContainer.innerHTML = "";
    
    // Group all 150 problems by category
    const categoriesMap = new Map();
    
    TOP_150_PROBLEMS.forEach(prob => {
        const matchesFilter = state.activeFilter === "all" || prob.category === state.activeFilter;
        const matchesSearch = matchesFilter && (
                              prob.title.toLowerCase().includes(state.searchTerm) || 
                              prob.category.toLowerCase().includes(state.searchTerm) ||
                              prob.difficulty.toLowerCase().includes(state.searchTerm));
                              
        if (!matchesSearch) return;
        
        if (!categoriesMap.has(prob.category)) {
            categoriesMap.set(prob.category, []);
        }
        categoriesMap.get(prob.category).push(prob);
    });
    
    if (categoriesMap.size === 0) {
        listContainer.innerHTML = '<div class="no-results">No problems found matching search criteria.</div>';
        return;
    }
    
    // Render groups
    categoriesMap.forEach((probs, categoryName) => {
        const groupDiv = document.createElement("div");
        groupDiv.className = "category-group";
        
        const solvedCount = probs.filter(p => state.solvedProblems.has(p.id)).length;
        
        const catTitle = document.createElement("div");
        catTitle.className = "category-title";
        catTitle.innerHTML = `
            <span>${categoryName}</span>
            <span class="category-count">${solvedCount}/${probs.length}</span>
        `;
        groupDiv.appendChild(catTitle);
        
        probs.forEach(prob => {
            const isSolved = state.solvedProblems.has(prob.id);
            const isActive = prob.id === state.selectedProblemId;
            
            const probItem = document.createElement("div");
            probItem.className = `problem-item ${isSolved ? 'solved' : ''} ${isActive ? 'active' : ''}`;
            probItem.setAttribute("data-id", prob.id);
            
            probItem.innerHTML = `
                <div class="problem-left">
                    <div class="status-checkbox">
                        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>
                    <span class="problem-name" title="${prob.title}">${prob.title}</span>
                </div>
                <span class="difficulty-badge ${prob.difficulty.toLowerCase()}">${prob.difficulty}</span>
            `;
            
            probItem.addEventListener("click", () => {
                selectProblem(prob.id);
            });
            
            groupDiv.appendChild(probItem);
        });
        
        listContainer.appendChild(groupDiv);
    });
}

// --- PROBLEM SELECTION VIEW ---
function selectProblem(id) {
    state.selectedProblemId = id;
    
    // Highlight list element in sidebar
    const items = document.querySelectorAll(".problem-item");
    items.forEach(el => {
        if (el.getAttribute("data-id") === id) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
    
    const problem = TOP_150_PROBLEMS.find(p => p.id === id);
    if (!problem) return;

    // Dynamically resolve missing fields for the 150-problem bank
    const resolvedJavaCode = problem.javaCode || generateOptimalJavaCode(problem);
    const resolvedBruteCode = problem.bruteForceCode || generateBruteForceJavaCode(problem);
    const resolvedFlow = problem.flowDiagram || generateFlowDiagram(problem);
    const resolvedLineExps = problem.lineExplanations || generateLineExplanations(resolvedJavaCode, problem);
    const resolvedTips = problem.tips || [
        "Optimize space allocations using the **In-Place** pointer transformation techniques.",
        "Consider empty inputs, negative indices, and overflow boundary cases."
    ];
    let resolvedDescription = problem.description || "Solve the target algorithm problem using highly optimized Java DSA structures.";
    if (!resolvedDescription.includes("[SCENARIO] **Concrete Scenario Example:**")) {
        resolvedDescription += `\n\n***\n[SCENARIO] **Concrete Scenario Example:**\n* **Input:** Standard input values according to criteria.\n* **Algorithm Flow:** The solution processes elements incrementally using linear scans or logarithmic subdivisions to balance memory grids.\n* **Visual Analogy:** Think of organizing a queue of items by shifting them in-place rather than allocating a secondary table.`;
    }

    const resolvedProblem = {
        ...problem,
        description: resolvedDescription,
        javaCode: resolvedJavaCode,
        bruteForceCode: resolvedBruteCode,
        flowDiagram: resolvedFlow,
        lineExplanations: resolvedLineExps,
        tips: resolvedTips,
        sampleTestCase: problem.sampleTestCase || {
            input: "nums = [Standard test array]",
            expected: "Expected output values"
        }
    };
    
    // Header Meta
    const titleEl = document.getElementById("header-problem-title");
    if (titleEl) {
        titleEl.innerHTML = `${resolvedProblem.title} <span class="difficulty-badge ${resolvedProblem.difficulty.toLowerCase()}">${resolvedProblem.difficulty}</span>`;
    }
    
    const catEl = document.getElementById("header-meta-category");
    if (catEl) catEl.innerText = resolvedProblem.category;
    
    const compEl = document.getElementById("header-meta-complexity");
    if (compEl) compEl.innerText = `Optimal: ${resolvedProblem.optimalComplexity ? resolvedProblem.optimalComplexity.time : "O(N)"}`;
    
    const leetcodeLink = document.getElementById("header-leetcode-link");
    if (leetcodeLink) leetcodeLink.setAttribute("href", resolvedProblem.leetcodeUrl);
    
    const codechefLink = document.getElementById("header-codechef-link");
    if (codechefLink) {
        if (resolvedProblem.codechefUrl) {
            codechefLink.setAttribute("href", resolvedProblem.codechefUrl);
            codechefLink.style.display = "inline-flex";
        } else {
            codechefLink.setAttribute("href", `https://www.codechef.com/problems/${resolvedProblem.id.toUpperCase().replace(/-/g, "")}`);
            codechefLink.style.display = "inline-flex";
        }
    }
    
    // Render dynamic company badges in meta
    const metaContainer = document.querySelector(".problem-meta");
    if (metaContainer) {
        const oldBadges = document.getElementById("header-company-badges");
        if (oldBadges) oldBadges.remove();
        
        if (resolvedProblem.companies && resolvedProblem.companies.length > 0) {
            const badgesDiv = document.createElement("div");
            badgesDiv.id = "header-company-badges";
            badgesDiv.className = "company-badges-container";
            badgesDiv.style.display = "inline-flex";
            badgesDiv.style.gap = "4px";
            badgesDiv.style.marginLeft = "8px";
            
            resolvedProblem.companies.forEach(company => {
                const badge = document.createElement("span");
                badge.className = `company-tag-badge ${company.toLowerCase()}`;
                badge.innerText = company;
                badgesDiv.appendChild(badge);
            });
            metaContainer.appendChild(badgesDiv);
        }
    }
    
    // Mark as solved button check
    const solvedToggle = document.getElementById("solved-toggle-btn");
    if (solvedToggle) {
        if (state.solvedProblems.has(id)) {
            solvedToggle.classList.add("is-solved");
            solvedToggle.innerHTML = `
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                Solved (Click to Re-open)
            `;
        } else {
            solvedToggle.classList.remove("is-solved");
            solvedToggle.innerHTML = `
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
                Mark as Solved
            `;
        }
    }
    
    // 1. Overview Tab (3D Flip Steps)
    const descBox = document.getElementById("problem-description");
    if (descBox) descBox.innerHTML = resolvedProblem.description;
    
    const flowContainer = document.getElementById("execution-flow-steps");
    if (flowContainer) {
        flowContainer.innerHTML = "";
        
        resolvedProblem.flowDiagram.forEach((step, idx) => {
            const stepDiv = document.createElement("div");
            stepDiv.className = "flow-step-3d";
            stepDiv.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <div class="flow-step-num">Step ${idx + 1}</div>
                        <div class="flow-step-title">${step.title}</div>
                        <div style="font-size:0.7rem; color:var(--text-muted); margin-top:10px;">Hover to see memory trace</div>
                    </div>
                    <div class="card-back">
                        <div class="flow-step-num">Trace Step ${idx + 1}</div>
                        <div class="flow-step-desc">${step.description}</div>
                    </div>
                </div>
            `;
            flowContainer.appendChild(stepDiv);
        });
    }
    
    // 2. Code Tab
    refreshCodeTab();

    const bruteComplexity = document.getElementById("brute-complexity-badge");
    if (bruteComplexity) {
        bruteComplexity.innerText = resolvedProblem.bruteForceComplexity ? `Time: ${resolvedProblem.bruteForceComplexity.time} | Space: ${resolvedProblem.bruteForceComplexity.space}` : "O(N²)";
    }
    
    const optimalComplexity = document.getElementById("optimal-complexity-badge");
    if (optimalComplexity) {
        optimalComplexity.innerText = resolvedProblem.optimalComplexity ? `Time: ${resolvedProblem.optimalComplexity.time} | Space: ${resolvedProblem.optimalComplexity.space}` : "O(N) | Space: O(1)";
    }
    
    const optPathText = document.getElementById("optimization-path-text");
    if (optPathText) {
        optPathText.innerText = resolvedProblem.optimizationPath || "Utilize direct array/list pointers, hashmap indexing lookups, or sliding windows to perform a single-pass solution, eliminating nested loop iterations.";
    }
    
    // 3. Workflow Tab
    renderWorkflowExplanation(resolvedProblem);
    
    // 4. Tips Tab
    const timeVal = document.getElementById("complexity-time-val");
    if (timeVal) timeVal.innerText = resolvedProblem.optimalComplexity ? resolvedProblem.optimalComplexity.time : "O(N)";
    
    const spaceVal = document.getElementById("complexity-space-val");
    if (spaceVal) spaceVal.innerText = resolvedProblem.optimalComplexity ? resolvedProblem.optimalComplexity.space : "O(1)";
    
    const tipsList = document.getElementById("tips-interactive-list");
    if (tipsList) {
        tipsList.innerHTML = "";
        resolvedProblem.tips.forEach((tip, index) => {
            const tipItem = document.createElement("div");
            tipItem.className = "tip-item";
            tipItem.innerHTML = `
                <div class="tip-icon">${index + 1}</div>
                <div class="tip-text">${formatMarkdownBold(tip)}</div>
            `;
            tipsList.appendChild(tipItem);
        });
    }
    
    // Render Topic-Wise Active Recall Q/As
    renderTopicRecallQA(resolvedProblem.category);

    // Render interactive array visualizer
    renderArrayVisualizer(resolvedProblem);

    // Auto-hide sidebar upon selecting a question to focus immediately
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
        sidebar.classList.remove("active");
    }
}

// --- ARRAY VISUALIZER RENDERER ---
let visTimer = null;
function renderArrayVisualizer(problem) {
    const card = document.getElementById("array-visualizer-card");
    if (!card) return;
    
    // Only show for certain categories
    const isTwoPointers = problem.category.includes("Two Pointers");
    const isSlidingWindow = problem.category.includes("Sliding Window");
    const isArray = problem.category.includes("Array");
    
    if (!isArray && !isTwoPointers && !isSlidingWindow) {
        card.style.display = "none";
        return;
    }
    card.style.display = "block";
    
    // Extract array from description or use default
    let arr = [1, 2, 3, 4, 5, 6, 7];
    const match = problem.description.match(/nums(?:1)?\s*=\s*\[(.*?)\]/);
    if (match && match[1]) {
        arr = match[1].split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        if (arr.length < 3) arr = [1, 2, 3, 4, 5, 6]; // Need some elements to show
    }
    
    const container = document.getElementById("array-visualizer-container");
    if (!container) return;
    container.innerHTML = "";
    
    // Create boxes
    const boxElements = [];
    arr.forEach((val, idx) => {
        const box = document.createElement("div");
        box.style.width = "40px";
        box.style.height = "40px";
        box.style.background = "var(--bg)";
        box.style.border = "2px solid var(--border)";
        box.style.borderRadius = "6px";
        box.style.display = "flex";
        box.style.alignItems = "center";
        box.style.justifyContent = "center";
        box.style.fontWeight = "bold";
        box.style.color = "var(--text-primary)";
        box.style.position = "relative";
        box.style.transition = "all 0.3s ease";
        box.innerText = val;
        
        // Add index label
        const idxLabel = document.createElement("div");
        idxLabel.innerText = idx;
        idxLabel.style.position = "absolute";
        idxLabel.style.bottom = "-20px";
        idxLabel.style.fontSize = "0.7rem";
        idxLabel.style.color = "var(--text-muted)";
        box.appendChild(idxLabel);
        
        container.appendChild(box);
        boxElements.push(box);
    });
    
    // Add Pointers based on category
    const pointers = [];
    const createPointer = (label, color, startPos) => {
        const ptr = document.createElement("div");
        ptr.innerHTML = `▲<br>${label}`;
        ptr.style.position = "absolute";
        ptr.style.bottom = "-45px";
        ptr.style.left = `${startPos * 48}px`;
        ptr.style.width = "40px";
        ptr.style.textAlign = "center";
        ptr.style.color = color;
        ptr.style.fontSize = "0.75rem";
        ptr.style.fontWeight = "bold";
        ptr.style.transition = "left 0.4s ease";
        ptr.style.lineHeight = "1.2";
        container.appendChild(ptr);
        return { el: ptr, pos: startPos, label };
    };

    if (isTwoPointers) {
        pointers.push(createPointer("L", "var(--primary)", 0));
        pointers.push(createPointer("R", "var(--hard)", arr.length - 1));
    } else if (isSlidingWindow) {
        pointers.push(createPointer("L", "var(--primary)", 0));
        pointers.push(createPointer("R", "var(--medium)", 2)); // Window of size 2 initially
    } else {
        pointers.push(createPointer("i", "var(--primary)", 0));
    }
    
    let stepCount = 0;
    const playBtn = document.getElementById("vis-play-btn");
    const resetBtn = document.getElementById("vis-reset-btn");
    const statusText = document.getElementById("vis-status-text");
    
    if (visTimer) clearInterval(visTimer);
    
    const updateVisuals = () => {
        let finished = false;
        
        if (isTwoPointers) {
            if (pointers[0].pos >= pointers[1].pos) finished = true;
            statusText.innerText = `Comparing L=${pointers[0].pos} and R=${pointers[1].pos}`;
        } else if (isSlidingWindow) {
            if (pointers[1].pos >= arr.length) finished = true;
            statusText.innerText = `Window from L=${pointers[0].pos} to R=${pointers[1].pos}`;
        } else {
            if (pointers[0].pos >= arr.length) finished = true;
            statusText.innerText = `Scanning index i=${pointers[0].pos}`;
        }
        
        if (finished && stepCount > 0) {
            statusText.innerText = "Finished execution trace";
            clearInterval(visTimer);
            visTimer = null;
            playBtn.innerText = "Play";
            return;
        }

        // Highlight active boxes
        boxElements.forEach((b, i) => {
            let isActive = false;
            if (isSlidingWindow) {
                isActive = (i >= pointers[0].pos && i <= pointers[1].pos);
            } else {
                isActive = pointers.some(p => p.pos === i);
            }
            
            if (isActive) {
                b.style.borderColor = "var(--primary)";
                b.style.background = isSlidingWindow ? "rgba(14,165,233,0.15)" : "var(--primary-glow)";
                b.style.transform = "translateY(-5px)";
            } else {
                b.style.borderColor = "var(--border)";
                b.style.background = "var(--bg)";
                b.style.transform = "translateY(0)";
            }
        });
        
        // Update positions visually
        pointers.forEach(p => {
            p.el.style.left = `${p.pos * 48}px`;
        });
        
        // Logic for NEXT step
        if (!finished) {
            if (isTwoPointers) {
                pointers[0].pos++;
                pointers[1].pos--;
            } else if (isSlidingWindow) {
                pointers[0].pos++;
                pointers[1].pos++;
            } else {
                pointers[0].pos++;
            }
        }
        stepCount++;
    };
    
    // Initialize
    statusText.innerText = "Ready";
    
    const playHandler = () => {
        if (visTimer) {
            clearInterval(visTimer);
            visTimer = null;
            playBtn.innerText = "Play";
            statusText.innerText = "Paused";
        } else {
            // Auto reset if at end
            let atEnd = false;
            if (isTwoPointers && pointers[0].pos >= pointers[1].pos) atEnd = true;
            if (isSlidingWindow && pointers[1].pos >= arr.length) atEnd = true;
            if (isArray && !isTwoPointers && !isSlidingWindow && pointers[0].pos >= arr.length) atEnd = true;
            
            if (atEnd) {
                stepCount = 0;
                if (isTwoPointers) { pointers[0].pos = 0; pointers[1].pos = arr.length - 1; }
                else if (isSlidingWindow) { pointers[0].pos = 0; pointers[1].pos = 2; }
                else { pointers[0].pos = 0; }
            }
            
            playBtn.innerText = "Pause";
            updateVisuals();
            visTimer = setInterval(updateVisuals, 1200);
        }
    };
    
    const resetHandler = () => {
        if (visTimer) clearInterval(visTimer);
        visTimer = null;
        playBtn.innerText = "Play";
        stepCount = 0;
        if (isTwoPointers) { pointers[0].pos = 0; pointers[1].pos = arr.length - 1; }
        else if (isSlidingWindow) { pointers[0].pos = 0; pointers[1].pos = 2; }
        else { pointers[0].pos = 0; }
        
        pointers.forEach(p => p.el.style.left = `${p.pos * 48}px`);
        statusText.innerText = "Ready";
        
        boxElements.forEach(b => {
            b.style.borderColor = "var(--border)";
            b.style.background = "var(--bg)";
            b.style.transform = "translateY(0)";
        });
    };
    
    // Replace old event listeners by cloning
    if (playBtn) {
        const newPlayBtn = playBtn.cloneNode(true);
        playBtn.parentNode.replaceChild(newPlayBtn, playBtn);
        newPlayBtn.addEventListener("click", playHandler);
    }
    
    if (resetBtn) {
        const newResetBtn = resetBtn.cloneNode(true);
        resetBtn.parentNode.replaceChild(newResetBtn, resetBtn);
        newResetBtn.addEventListener("click", resetHandler);
    }
}

// --- STEP-BY-STEP WORKFLOW RENDERER ---
function renderWorkflowExplanation(problem) {
    const container = document.getElementById("workflow-steps-list");
    if (!container) return;
    container.innerHTML = "";

    const steps = problem.workflowExplanation || [
        { title: "Initialize", description: "Set up pointers and variables needed for the algorithm." },
        { title: "Process", description: "Iterate through the data applying the core logic." },
        { title: "Return", description: "Return the result after processing completes." }
    ];

    steps.forEach((step, idx) => {
        const div = document.createElement("div");
        div.className = "workflow-step";
        div.style.animationDelay = `${idx * 0.08}s`;
        div.innerHTML = `
            <div class="workflow-step-title">
                <span style="color: var(--primary); font-family: var(--font-mono); font-size: 0.8rem; margin-right: 8px;">STEP ${idx + 1}</span>
                ${step.title}
            </div>
            <div class="workflow-step-desc">${step.description}</div>
        `;
        container.appendChild(div);
    });
}

function highlightJavaKeywords(text) {
    const keywords = ["class", "public", "private", "protected", "void", "int", "boolean", "double", "long", "while", "for", "if", "else", "return", "new", "import", "null", "break", "continue"];
    const types = ["Solution", "ListNode", "TreeNode", "Stack", "List", "ArrayList", "Arrays", "Math", "String", "HashMap", "Map", "Set", "HashSet", "Integer", "Random", "RandomizedSet", "LRUCache", "Node", "Queue", "LinkedList", "PriorityQueue"];
    
    let escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (escaped.trim().startsWith("//")) return `<span class="comment">${escaped}</span>`;
    
    const commentIdx = escaped.indexOf("//");
    let codePart = escaped;
    let commentPart = "";
    if (commentIdx !== -1) {
        codePart = escaped.substring(0, commentIdx);
        commentPart = `<span class="comment">${escaped.substring(commentIdx)}</span>`;
    }
    
    codePart = codePart.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
    codePart = codePart.replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
    
    keywords.forEach(word => {
        const regex = new RegExp(`\\b(${word})\\b`, 'g');
        codePart = codePart.replace(regex, '<span class="keyword">$1</span>');
    });
    
    types.forEach(type => {
        const regex = new RegExp(`\\b(${type})\\b`, 'g');
        codePart = codePart.replace(regex, '<span class="type">$1</span>');
    });
    
    return codePart + commentPart;
}

function formatMarkdownBold(text) {
    return text
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\$([^$]+)\$/g, '<code style="background:#e0f2fe;padding:1px 4px;border-radius:4px;font-family:var(--font-mono);font-size:0.8rem;color:var(--primary);">$1</code>')
        .replace(/`([^`]+)`/g, '<code style="background:#e0f2fe;padding:1px 4px;border-radius:4px;font-family:var(--font-mono);font-size:0.8rem;color:var(--easy);">$1</code>');
}

// --- TAB SWITCHER ---
function switchTab(tabId) {
    state.activeTabId = tabId;
    const buttons = document.querySelectorAll(".tab-button");
    buttons.forEach(btn => {
        if (btn.getAttribute("data-tab") === tabId) btn.classList.add("active");
        else btn.classList.remove("active");
    });
    
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(content => {
        if (content.getAttribute("id") === `${tabId}-tab-content`) content.classList.add("active");
        else content.classList.remove("active");
    });
}

// --- MARK SOLVED TOGGLE ---
function toggleProblemSolvedState() {
    const id = state.selectedProblemId;
    if (!id) return;
    
    if (state.solvedProblems.has(id)) {
        state.solvedProblems.delete(id);
    } else {
        state.solvedProblems.add(id);
    }
    
    saveSolvedToStorage();
    renderSidebar();
    selectProblem(id);
    updateGlobalProgress();
}

// --- GLOBAL STATISTICS UPDATES ---
function updateGlobalProgress() {
    const solvedNum = state.solvedProblems.size;
    const totalNum = TOP_150_PROBLEMS.length;
    
    const percentage = totalNum > 0 ? Math.round((solvedNum / totalNum) * 100) : 0;
    
    const progressFraction = document.getElementById("progress-fraction");
    if (progressFraction) progressFraction.innerText = `${solvedNum} / ${totalNum} Solved`;
    
    const percentLabel = document.getElementById("progress-percent-label");
    if (percentLabel) percentLabel.innerText = `${percentage}%`;
    
    const circle = document.getElementById("progress-circle-meter");
    if (circle) {
        const radius = 26;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = offset;
    }

    // Update dynamic footer problem count
    const footerCount = document.getElementById("footer-problem-count");
    if (footerCount) {
        footerCount.innerText = `Database: ${totalNum} Top Interview Problems`;
    }
}

// --- CLIPBOARD ACTIONS ---
function copyCurrentCode() {
    const id = state.selectedProblemId;
    if (!id) return;
    const problem = TOP_150_PROBLEMS.find(p => p.id === id);
    if (!problem) return;

    const code = problem.javaCode || generateOptimalJavaCode(problem);
    
    navigator.clipboard.writeText(code || "").then(() => {
        const copyBtn = document.getElementById("copy-code-btn");
        const originalHTML = copyBtn.innerHTML;
        copyBtn.style.borderColor = "var(--easy)";
        copyBtn.style.color = "var(--easy)";
        copyBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; color: var(--easy);"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
        setTimeout(() => {
            copyBtn.style.borderColor = "";
            copyBtn.style.color = "";
            copyBtn.innerHTML = originalHTML;
        }, 1500);
    });
}

function copyBruteCode() {
    const id = state.selectedProblemId;
    if (!id) return;
    const problem = TOP_150_PROBLEMS.find(p => p.id === id);
    if (!problem) return;
    
    const bruteCode = problem.bruteForceCode || `// A brute force solution is trivial. Use optimal directly!`;
    
    navigator.clipboard.writeText(bruteCode).then(() => {
        const copyBtn = document.getElementById("copy-brute-code-btn");
        const originalHTML = copyBtn.innerHTML;
        
        copyBtn.style.borderColor = "var(--easy)";
        copyBtn.style.color = "var(--easy)";
        copyBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; color: var(--easy);"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
        
        setTimeout(() => {
            copyBtn.style.borderColor = "";
            copyBtn.style.color = "";
            copyBtn.innerHTML = originalHTML;
        }, 1500);
    });
}

// --- SECURE AUTHOR SIGNATURE FOOTPRINT & TAMPER GUARDS ---
const CIPHERS = {
    NAME: "Vm9INFtZN25cWlRxW1k2aVdDPz8=",
    LINK: "Y0pUMmVKTzhOezt1Y1k3dFxZVHJkazdsZDQyeGNZNnhkb0g0W1k3blxaVHFbWTZ2ZUM/Pw==",
    COPY: "UzQ7eWdaTHJcNGoyS01taU9sQ3tQa0RRW1pcamRvWG5mSWpqZGtEU05rRERkSXlpV29ucGNKVHxLSExuZTRYe2ZvWG1OaT8/"
};

function decrypt(cipher) {
    try {
        const step1 = atob(cipher);
        let shifted = "";
        for (let i = 0; i < step1.length; i++) {
            shifted += String.fromCharCode(step1.charCodeAt(i) - 2);
        }
        return atob(shifted);
    } catch (e) {
        return "";
    }
}

function checkIntegrity() {
    const expectedName = decrypt(CIPHERS.NAME);
    const expectedLink = decrypt(CIPHERS.LINK);
    const expectedCopyright = decrypt(CIPHERS.COPY);
    
    // Footer check
    const sig = document.getElementById("developer-signature");
    if (!sig || !sig.innerText.includes(expectedName)) {
        return false;
    }
    
    // About Name check
    const aboutName = document.getElementById("developer-identity-name");
    if (!aboutName || aboutName.innerText !== expectedName) {
        return false;
    }
    
    // About Link check
    const aboutLink = document.getElementById("developer-identity-linkedin");
    if (!aboutLink || aboutLink.getAttribute("href") !== expectedLink) {
        return false;
    }
    
    // About Copyright check
    const aboutCopyright = document.getElementById("developer-identity-copyright");
    if (!aboutCopyright || !aboutCopyright.innerText.includes(expectedName)) {
        return false;
    }
    
    return true;
}

let tamperCount = 0;

function selfHealSignature() {
    tamperCount++;
    console.warn("[SECURITY] Signature tampering detected. Restoring core assets.");
    
    const expectedName = decrypt(CIPHERS.NAME);
    const expectedLink = decrypt(CIPHERS.LINK);
    const expectedCopyright = decrypt(CIPHERS.COPY);
    
    // Self-heal footer signature
    const footer = document.querySelector(".footer-secure");
    if (footer) {
        let sig = document.getElementById("developer-signature");
        if (!sig) {
            sig = document.createElement("span");
            sig.id = "developer-signature";
            footer.appendChild(sig);
        }
        sig.innerText = expectedName;
        sig.style.display = "";
        sig.style.opacity = "";
        sig.style.visibility = "";
    }
    
    // Self-heal About Tab elements
    const aboutName = document.getElementById("developer-identity-name");
    if (aboutName) {
        aboutName.innerText = expectedName;
        aboutName.style.display = "";
        aboutName.style.opacity = "";
        aboutName.style.visibility = "";
    }
    
    const aboutLink = document.getElementById("developer-identity-linkedin");
    if (aboutLink) {
        aboutLink.setAttribute("href", expectedLink);
        aboutLink.style.display = "";
        aboutLink.style.opacity = "";
        aboutLink.style.visibility = "";
    }
    
    const aboutCopyright = document.getElementById("developer-identity-copyright");
    if (aboutCopyright) {
        aboutCopyright.innerHTML = `Copyright &copy; 2026 <a id="developer-identity-linkedin" href="${expectedLink}" target="_blank" style="color:var(--primary);font-weight:600;text-decoration:none;"><span id="developer-identity-name">${expectedName}</span></a>. All Rights Reserved.`;
        aboutCopyright.style.display = "";
        aboutCopyright.style.opacity = "";
        aboutCopyright.style.visibility = "";
    }
    
    // If tamper attempts persist, lock the screen overlay
    if (tamperCount > 3) {
        const overlay = document.getElementById("tamper-lock-screen");
        if (overlay) {
            overlay.style.display = "flex";
        }
    }
}

function deployAuthorSignature() {
    const footer = document.querySelector(".footer-secure");
    if (!footer) return;
    
    // Inject decrypted signature footprint
    const signatureSpan = document.createElement("span");
    signatureSpan.id = "developer-signature";
    signatureSpan.innerText = decrypt(CIPHERS.NAME);
    footer.appendChild(signatureSpan);
    
    // Deploys active background MutatorObserver daemon to watch signature integrity
    const observer = new MutationObserver((mutations) => {
        if (!checkIntegrity()) {
            selfHealSignature();
        }
    });
    
    observer.observe(footer, { childList: true, subtree: true, attributes: true, characterData: true });
    

    
    // Backup interval safety daemon thread (every 800ms)
    setInterval(() => {
        if (!checkIntegrity()) {
            selfHealSignature();
        }
    }, 800);
}

// --- DYNAMIC CODE & FLOW DIAGRAM GENERATORS FOR 150 BANK ---
function getMethodNameFromId(id) {
    const map = {
        "remove-duplicates-from-sorted-array": "removeDuplicates",
        "remove-duplicates-from-sorted-array-ii": "removeDuplicates",
        "majority-element": "majorityElement",
        "best-time-to-buy-and-sell-stock-ii": "maxProfit",
        "jump-game": "canJump",
        "jump-game-ii": "jump",
        "h-index": "hIndex",
        "insert-delete-getrandom-o1": "RandomizedSet",
        "product-of-array-except-self": "productExceptSelf",
        "gas-station": "canCompleteCircuit",
        "candy": "candy",
        "trapping-rain-water": "trap",
        "roman-to-integer": "romanToInt",
        "integer-to-roman": "intToRoman",
        "length-of-last-word": "lengthOfLastWord",
        "longest-common-prefix": "longestCommonPrefix",
        "reverse-words-in-a-string": "reverseWords",
        "zigzag-conversion": "convert",
        "find-the-index-of-the-first-occurrence-in-a-string": "strStr",
        "text-justification": "fullJustify",
        "valid-palindrome": "isPalindrome",
        "is-subsequence": "isSubsequence",
        "two-sum-ii-input-array-is-sorted": "twoSum",
        "minimum-size-subarray-sum": "minSubArrayLen",
        "substring-with-concatenation-of-all-words": "findSubstring",
        "minimum-window-substring": "minWindow",
        "valid-sudoku": "isValidSudoku",
        "spiral-matrix": "spiralOrder",
        "rotate-image": "rotate",
        "set-matrix-zeroes": "setZeroes",
        "game-of-life": "gameOfLife",
        "ransom-note": "canConstruct",
        "isomorphic-strings": "isIsomorphic",
        "word-pattern": "wordPattern",
        "valid-anagram": "isAnagram",
        "group-anagrams": "groupAnagrams",
        "happy-number": "isHappy",
        "contains-duplicate-ii": "containsNearbyDuplicate",
        "longest-consecutive-sequence": "longestConsecutive",
        "summary-ranges": "summaryRanges",
        "merge-intervals": "merge",
        "insert-interval": "insert",
        "minimum-number-of-arrows-to-burst-balloons": "findMinArrowShots",
        "valid-parentheses": "isValid",
        "simplify-path": "simplifyPath",
        "min-stack": "MinStack",
        "evaluate-reverse-polish-notation": "evalRPN",
        "basic-calculator": "calculate",
        "linked-list-cycle": "hasCycle",
        "add-two-numbers": "addTwoNumbers",
        "merge-two-sorted-lists": "mergeTwoLists",
        "copy-list-with-random-pointer": "copyRandomList",
        "reverse-nodes-in-k-group": "reverseKGroup",
        "remove-nth-node-from-end-of-list": "removeNthFromEnd",
        "remove-duplicates-from-sorted-list-ii": "deleteDuplicates",
        "rotate-list": "rotateRight",
        "partition-list": "partition",
        "lru-cache": "LRUCache",
        "maximum-depth-of-binary-tree": "maxDepth",
        "same-tree": "isSameTree",
        "invert-binary-tree": "invertTree",
        "symmetric-tree": "isSymmetric",
        "path-sum": "hasPathSum",
        "sum-root-to-leaf-numbers": "sumNumbers",
        "binary-tree-maximum-path-sum": "maxPathSum",
        "construct-binary-tree-from-preorder-and-inorder-traversal": "buildTree",
        "construct-binary-tree-from-inorder-and-postorder-traversal": "buildTree",
        "populating-next-right-pointers-in-each-node-ii": "connect",
        "flatten-binary-tree-to-linked-list": "flatten",
        "count-complete-tree-nodes": "countNodes",
        "lowest-common-ancestor-of-a-binary-tree": "lowestCommonAncestor",
        "binary-tree-right-side-view": "rightSideView",
        "average-of-levels-in-binary-tree": "averageOfLevels",
        "binary-tree-level-order-traversal": "levelOrder",
        "binary-tree-zigzag-level-order-traversal": "zigzagLevelOrder",
        "minimum-absolute-difference-in-bst": "getMinimumDifference",
        "kth-smallest-element-in-a-bst": "kthSmallest",
        "number-of-islands": "numIslands",
        "surrounded-regions": "solve",
        "clone-graph": "cloneGraph",
        "evaluate-division": "calcEquation",
        "course-schedule": "canFinish",
        "course-schedule-ii": "findOrder",
        "snakes-and-ladders": "snakesAndLadders",
        "minimum-genetic-mutation": "minMutation",
        "word-ladder": "ladderLength",
        "implement-trie-prefix-tree": "Trie",
        "design-add-and-search-words-data-structure": "WordDictionary",
        "word-search-ii": "findWords",
        "letter-combinations-of-a-phone-number": "letterCombinations",
        "combinations": "combine",
        "permutations": "permute",
        "combination-sum": "combinationSum",
        "n-queens-ii": "totalNQueens",
        "word-search": "exist",
        "generate-parentheses": "generateParenthesis",
        "sort-list": "sortList",
        "merge-k-sorted-lists": "mergeKLists",
        "convert-sorted-array-to-binary-search-tree": "sortedArrayToBST",
        "maximum-subarray": "maxSubArray",
        "maximum-sum-circular-subarray": "maxSubarraySumCircular",
        "search-insert-position": "searchInsert",
        "search-a-2d-matrix": "searchMatrix",
        "find-peak-element": "findPeakElement",
        "search-in-rotated-sorted-array": "search",
        "find-first-and-last-position-of-element-in-sorted-array": "searchRange",
        "find-minimum-in-rotated-sorted-array": "findMin",
        "median-of-two-sorted-arrays": "findMedianSortedArrays",
        "kth-largest-element-in-an-array": "findKthLargest",
        "ipo": "findMaximizedCapital",
        "find-k-pairs-with-smallest-sums": "kSmallestPairs",
        "find-median-from-data-stream": "MedianFinder",
        "add-binary": "addBinary",
        "reverse-bits": "reverseBits",
        "number-of-1-bits": "hammingWeight",
        "single-number": "singleNumber",
        "single-number-ii": "singleNumber",
        "bitwise-and-of-numbers-range": "rangeBitwiseAnd",
        "palindrome-number": "isPalindrome",
        "plus-one": "plusOne",
        "factorial-trailing-zeroes": "trailingZeroes",
        "sqrtx": "mySqrt",
        "powx-n": "myPow",
        "max-points-on-a-line": "maxPoints",
        "climbing-stairs": "climbStairs",
        "house-robber": "rob",
        "word-break": "wordBreak",
        "coin-change": "coinChange",
        "longest-increasing-subsequence": "lengthOfLIS",
        "triangle": "minimumTotal",
        "minimum-path-sum": "minPathSum",
        "unique-paths-ii": "uniquePathsWithObstacles",
        "longest-common-subsequence": "longestCommonSubsequence",
        "edit-distance": "minDistance",
        "maximal-square": "maximalSquare",
        "best-time-to-buy-and-sell-stock-iii": "maxProfit",
        "best-time-to-buy-and-sell-stock-iv": "maxProfit",
        "interleaving-string": "isInterleave"
    };
    return map[id] || "solve";
}

function getReturnTypeFromId(id) {
    if (id.includes("is-") || id.includes("valid") || id.startsWith("can") || id === "linked-list-cycle" || id === "happy-number") return "boolean";
    if (id.includes("index") || id.includes("length") || id.includes("sum") || id.includes("max") || id.includes("min") || id.includes("depth") || id.includes("count") || id.includes("difference") || id.includes("size") || id.includes("number") || id === "candy" || id === "trap" || id === "h-index" || id === "remove-duplicates-from-sorted-array" || id === "remove-element" || id === "climbing-stairs" || id === "coin-change" || id === "house-robber") return "int";
    if (id.includes("words") || id.includes("prefix") || id.includes("roman") || id === "minimum-window-substring" || id === "simplify-path" || id === "add-binary") return "String";
    if (id.includes("list") && !id.includes("array")) return "ListNode";
    if (id.includes("tree") || id.includes("node") || id.includes("ancestor")) return "TreeNode";
    if (id.includes("matrix") || id.includes("image") || id.includes("zeroes") || id.includes("regions")) return "void";
    if (id === "two-sum") return "int[]";
    return "int[]";
}

function getParamsFromId(id) {
    if (id.includes("string") || id.includes("pattern") || id.includes("word") || id === "roman-to-integer" || id === "valid-palindrome" || id === "simplify-path") return "String s";
    if (id.includes("matrix") || id.includes("image") || id.includes("zeroes") || id.includes("islands") || id.includes("regions")) return "int[][] grid";
    if (id.includes("array") || id.includes("nums") || id.includes("prices") || id.includes("height") || id.includes("duplicates") || id === "majority-element" || id === "candy" || id === "trap" || id === "climbing-stairs" || id === "house-robber") return "int[] nums";
    if (id.includes("list") || id === "linked-list-cycle") return "ListNode head";
    if (id.includes("tree") || id === "minimum-absolute-difference-in-bst" || id === "kth-smallest-element-in-a-bst") return "TreeNode root";
    return "int[] nums, int target";
}

function generateOptimalJavaCode(problem) {
    const methodName = getMethodNameFromId(problem.id);
    const returnType = getReturnTypeFromId(problem.id);
    const params = getParamsFromId(problem.id);
    
    // Custom hardcoded templates for popular metadata-only problems
    const codeMaps = {
        "remove-duplicates-from-sorted-array": `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        int writeIndex = 1;
        for (int readIndex = 1; readIndex < nums.length; readIndex++) {
            // Write only when current element differs from previous seen unique element
            if (nums[readIndex] != nums[readIndex - 1]) {
                nums[writeIndex++] = nums[readIndex];
            }
        }
        return writeIndex;
    }
}`,
        "majority-element": `class Solution {
    public int majorityElement(int[] nums) {
        // Boyer-Moore Voting Algorithm: O(N) time and O(1) space
        int candidate = nums[0];
        int count = 1;
        for (int i = 1; i < nums.length; i++) {
            if (count == 0) {
                candidate = nums[i];
                count = 1;
            } else if (nums[i] == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }
}`,
        "valid-palindrome": `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++; right--;
        }
        return true;
    }
}`,
        "linked-list-cycle": `public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true; // Cycle detected
        }
        return false;
    }
}`,
        "merge-two-sorted-lists": `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`
    };
    
    if (codeMaps[problem.id]) return codeMaps[problem.id];
    
    // Generic structural templates based on category
    let templateBody = `// OPTIMAL APPROACH: ${problem.optimizationPath || "Scan elements and perform structural transitions."}\n        `;
    if (problem.category === "Two Pointers" || problem.category === "Array / String") {
        templateBody += `int left = 0, right = nums.length - 1;\n        while (left < right) {\n            // Add condition and sliding pointer checks\n            left++; right--;\n        }\n        return ${returnType === "boolean" ? "true" : "0"};`;
    } else if (problem.category === "Binary Search") {
        templateBody += `int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;`;
    } else if (problem.category === "Linked List") {
        templateBody += `ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode slow = dummy, fast = dummy;\n        // Solve linked list transitions\n        return dummy.next;`;
    } else if (problem.category === "Binary Tree General" || problem.category === "Binary Search Tree") {
        templateBody += `if (root == null) return ${returnType === "boolean" ? "true" : "0"};\n        // DFS traversal\n        return ${returnType === "boolean" ? "true" : "0"};`;
    } else if (problem.category === "1D Dynamic Programming") {
        templateBody += `int n = nums.length; // placeholder step count\n        int[] dp = new int[n + 1];\n        dp[0] = 0; dp[1] = 1;\n        for (int i = 2; i <= n; i++) {\n            dp[i] = dp[i-1] + dp[i-2];\n        }\n        return dp[n];`;
    } else {
        templateBody += `// TODO: Implement bottom-up tabulation or recursive DFS search\n        return ${returnType === "boolean" ? "false" : returnType === "int" ? "0" : "null"};`;
    }
    
    return `class Solution {\n    public ${returnType} ${methodName}(${params}) {\n        ${templateBody}\n    }\n}`;
}

function generateBruteForceJavaCode(problem) {
    const codeMaps = {
        "remove-duplicates-from-sorted-array": `class Solution {
    public int removeDuplicates(int[] nums) {
        // Brute Force: Create a list, add unique values, and copy back
        java.util.List<Integer> list = new java.util.ArrayList<>();
        for (int num : nums) {
            if (!list.contains(num)) list.add(num);
        }
        for (int i = 0; i < list.size(); i++) {
            nums[i] = list.get(i);
        }
        return list.size();
    }
}`,
        "majority-element": `class Solution {
    public int majorityElement(int[] nums) {
        // Brute Force: Count occurrences of each number using nested loops
        int majorityCount = nums.length / 2;
        for (int num : nums) {
            int count = 0;
            for (int elem : nums) {
                if (elem == num) count++;
            }
            if (count > majorityCount) return num;
        }
        return -1;
    }
}`
    };
    if (codeMaps[problem.id]) return codeMaps[problem.id];
    
    return `class Solution {\n    // Brute Force Comparison Approach\n    // Complexity: Time O(N²) or O(2^N) | Space O(N)\n    // Run standard nested search loops to evaluate all elements/combinations\n}`;
}

function generateFlowDiagram(problem) {
    return [
        { title: "Initialize variables", description: "Establish dynamic memory pointers or helper data grids based on O(1) space optimizations." },
        { title: "Loop & scan", description: `Iterate through elements using linear passes, binary subdivisions, or recursion trees.` },
        { title: "Evaluate & return", description: "Return target parameters or count thresholds, verifying correct bounds." }
    ];
}

function generateLineExplanations(javaCode, problem) {
    return [
        { lines: [2], text: `Standard method entry signature for the target ${problem.title} problem.` },
        { lines: [3], text: "Initialize tracking variables, pointer cursors, or base recursion states." },
        { lines: [4, 5], text: "Scan items and apply greedy decisions to shrink bounds in O(N) or O(log N) boundaries." }
    ];
}

// --- TOPIC MASTERY ACTIVE RECALL RENDERER ---
function renderTopicRecallQA(category) {
    const titleEl = document.getElementById("recall-category-title");
    if (titleEl) titleEl.innerText = category;
    
    const container = document.getElementById("recall-flashcards-list");
    if (!container) return;
    
    container.innerHTML = "";
    
    // Retrieve recall Q/A lists from problems-data.js, fall back on dynamic defaults
    const qaList = TOPIC_RECALL_QA[category] || [
        {
            q: `What are the core optimization principles for ${category}?`,
            a: "Minimize time complexity by reducing nested loops to linear passes (using pointer sliders, HashMaps, or index trackers) and optimize auxiliary storage space to target O(1) in-place modifications."
        },
        {
            q: `How do you tackle edge cases in ${category} problems?`,
            a: "Inspect structural inputs at boundaries: handle empty inputs, single element lists, negative thresholds, and numeric overflow limitations."
        }
    ];
    
    qaList.forEach(qa => {
        const card = document.createElement("div");
        card.className = "recall-flashcard";
        
        card.innerHTML = `
            <div class="recall-q-header">
                <span>${qa.q}</span>
                <span class="recall-toggle-indicator">▼</span>
            </div>
            <div class="recall-answer-box">
                ${formatMarkdownBold(qa.a)}
            </div>
        `;
        
        card.addEventListener("click", (e) => {
            // Prevent toggling active state if selecting text inside answer
            if (window.getSelection().toString() === "") {
                card.classList.toggle("active");
            }
        });
        
        container.appendChild(card);
    });
}



