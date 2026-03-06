const STATIC_LINES = [
    { prompt: true, text: 'whoami' },
    { prompt: false, text: 'Mac Cooper' },
    { prompt: true, text: 'echo $TITLE' },
    { prompt: false, text: 'Software Engineer' },
    { prompt: true, text: 'echo $LOCATION' },
    { prompt: false, text: 'British Columbia, Canada' },
    { prompt: true, text: "grep 'interests' README.md" },
    { prompt: false, text: '## interests: algorithms, systems programming, game engines, graphics, security, compilers' },
]

const LOOP_CMD = "jq -r '.[].description' projects.json"

const SPEEDS = { cmd: 38, output: 22, delete: 14, linePause: 220, descPause: 1500 }

const Phase = Object.freeze({
    STATIC: 'static',
    CMD: 'cmd',
    TYPING: 'typing',
    PAUSING: 'pausing',
    DELETING: 'deleting',
})


function initTerminal() {
    const body = document.getElementById('terminal-body')
    if (!body) return

    const state = {
        phase: Phase.STATIC,
        lineIdx: 0,
        charIdx: 0,
        visibleText: '',
        descIdx: 0,
        descCharIdx: 0,
    }

    function render() {
        const lines = []
        for (let i = 0; i < state.lineIdx; i++) {
            if (STATIC_LINES[i].prompt) {
                lines.push(`<div class="t-line"><span class="t-prompt">~ $</span><span class="t-cmd">${STATIC_LINES[i].text}</span></div>`)

            } else {
                lines.push(`<div class="t-line"><span class="t-output">${STATIC_LINES[i].text}</span></div>`)
            }
        }
        if (state.phase == Phase.STATIC && STATIC_LINES[state.lineIdx] != null) {
            if (STATIC_LINES[state.lineIdx].prompt) {
                lines.push(`<div class="t-line"><span class="t-prompt">~ $</span><span class="t-cmd">${state.visibleText}</span></div>`)
            } else {
                lines.push(`<div class="t-line"><span class="t-output">${state.visibleText}</span></div>`)
            }
        }
        body.innerHTML = lines.join('')
    }

    function advance() {
        //advance on single tick of our 
        //push char pointers, roll over.

        if (state.charIdx < STATIC_LINES[state.lineIdx].text.length) {
            //type one more character
            state.visibleText += STATIC_LINES[state.lineIdx].text[state.charIdx];
            state.charIdx++;
            render();
            if (STATIC_LINES[state.lineIdx].prompt) {
                setTimeout(advance, SPEEDS.cmd);
            } else {
                setTimeout(advance, SPEEDS.output);
            }
        } else {
            state.charIdx = 0;
            state.lineIdx++;
            state.visibleText = '';
            setTimeout(advance, SPEEDS.linePause);
            if (state.lineIdx > STATIC_LINES.length) {
                state.phase++
            }
        }

    }
}


