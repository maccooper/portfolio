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
        tapeHead: 0,
        lineHead: 0,
        visibleText: '',
        descIdx: 0,
    }

      function render() {
          //#TODO: Develop renderer for FSM
      }


}
