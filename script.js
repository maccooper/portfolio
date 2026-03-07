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


async function initTerminal() {
    const body = document.getElementById('terminal-body')
    const projects = await fetch('/projects.json').then(res => res.json());
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
        const cursor = '<span class="cursor"></span>'

        for (let i = 0; i < state.lineIdx; i++) {
            if (STATIC_LINES[i].prompt) {
                lines.push(`<div class="t-line"><span class="t-prompt">~ $</span><span class="t-cmd">${STATIC_LINES[i].text}</span></div>`)
            } else {
                lines.push(`<div class="t-line"><span class="t-output">${STATIC_LINES[i].text}</span></div>`)
            }
        }

        if (state.phase === Phase.STATIC && STATIC_LINES[state.lineIdx] != null) {
            if (STATIC_LINES[state.lineIdx].prompt) {
                lines.push(`<div class="t-line"><span class="t-prompt">~ $</span><span class="t-cmd">${state.visibleText}${cursor}</span></div>`)
            } else {
                lines.push(`<div class="t-line"><span class="t-output">${state.visibleText}${cursor}</span></div>`)
            }
        }

        if (state.phase === Phase.CMD) {
            lines.push(`<div class="t-line"><span class="t-prompt">~ $</span><span class="t-cmd">${state.visibleText}${cursor}</span></div>`)
        } else if (state.phase !== Phase.STATIC) {
            lines.push(`<div class="t-line"><span class="t-prompt">~ $</span><span class="t-cmd">${LOOP_CMD}</span></div>`)
        }

        if (state.phase === Phase.TYPING || state.phase === Phase.PAUSING || state.phase === Phase.DELETING) {
            lines.push(`<div class="t-line"><span class="t-output">${state.visibleText}${cursor}</span></div>`)
        }

        body.innerHTML = lines.join('')
        body.scrollTop = body.scrollHeight
    }

    function staticPhase() {
        if (state.lineIdx >= STATIC_LINES.length) return

        if (state.charIdx < STATIC_LINES[state.lineIdx].text.length) {
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
            if (state.lineIdx >= STATIC_LINES.length) {
                state.phase = Phase.CMD
            }
            setTimeout(advance, SPEEDS.linePause);
        }
    }

    function cmd() {
        if (state.charIdx < LOOP_CMD.length) {
            state.visibleText += LOOP_CMD[state.charIdx];
            state.charIdx++;
            render();
            setTimeout(advance, SPEEDS.cmd);
        } else {
            state.charIdx = 0;
            state.visibleText = '';
            state.phase = Phase.TYPING;
            setTimeout(advance, SPEEDS.linePause);
        }

    }

    function typing() {
        if (state.descCharIdx < projects[state.descIdx].description.length) {
            state.visibleText += projects[state.descIdx].description[state.descCharIdx];
            state.descCharIdx++;
            setTimeout(advance, SPEEDS.output);
            render()
        } else {
            state.phase = Phase.PAUSING;
            setTimeout(advance, SPEEDS.descPause);
        }

    }

    function pausing() {
        state.phase = Phase.DELETING;
        advance()
    }

    function deleting() {
        if (state.descCharIdx > 0) {
            state.visibleText = state.visibleText.slice(0, -1)
            state.descCharIdx--;
            render()
            setTimeout(advance, SPEEDS.delete);
        } else {
            state.descCharIdx = 0;
            state.visibleText = '';
            state.descIdx = (state.descIdx + 1) % projects.length;
            state.phase = Phase.TYPING;
            setTimeout(advance, SPEEDS.linePause);
        }
    }

    const handlers = {
        [Phase.STATIC]: staticPhase,
        [Phase.CMD]: cmd,
        [Phase.TYPING]: typing,
        [Phase.PAUSING]: pausing,
        [Phase.DELETING]: deleting,
    }

    function advance() {
        handlers[state.phase]?.()
    }

    render()
    advance()
}

document.addEventListener('DOMContentLoaded', () => {
    initTerminal()
})
