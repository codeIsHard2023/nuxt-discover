<script setup lang="ts">
import { content } from '#tailwind-config';

const iframe = ref<HTMLIFrameElement>();
const webContUrl = ref<string>();

type Status = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'

const status = ref<Status>('init')
const error = ref<{ message: string }>() // maybe use shallowRef instead of ref ? 

const stream = ref<ReadableStream>()

async function startDevServer() {
    const rawFiles = import.meta.glob([
        '../templates/basic/*.*',
        '!**/node_modules/**',
    ], {
        as: 'raw',
        eager: true,
    })
    const files = Object.fromEntries(
        Object.entries(rawFiles).map(([path, content]) => {
            return [path.replace('../templates/basic/', ''), {
                file: {
                    contents: content,
                },
            }]
        }),
    )

    const webContainer = await useWebContainer();

    webContainer.on("server-ready", (port, url) => {
        status.value = 'ready'
        webContUrl.value = url;
    });

    webContainer.on('error', (err) => {
        status.value = "error"
        error.value = err
    })

    status.value = 'mount'
    await webContainer.mount(files);

    status.value = 'install'

    const installProcess = await webContainer.spawn("npm", ["install"]);
    // installProcess.output.pipeTo(stream)
    stream.value = installProcess.output
    const installExitCode = await installProcess.exit;

    if (installExitCode !== 0) {
        status.value = 'error'
        error.value = {
            message: `Unable to run npm install, exit as ${installExitCode}`
        }
        throw new Error("Unable to run npm install");
    }
    status.value = 'start'
    const devProcess = await webContainer.spawn("npm", ["run", "dev"]);
    stream.value = devProcess.output
}

watchEffect(() => {
    if (iframe.value && webContUrl.value) iframe.value.src = webContUrl.value;
});

onMounted(startDevServer);
</script>

<template>
    <div h-full w-full grid="~ rows-[2fr_2fr]" of-hidden>
        <iframe ref="iframe" w-full h-full v-show="status === 'ready'" />
        <div v-if="status !== 'ready'" w-full h-full texte-lg flex="~ items-center justify-center gap4">
            Status : {{ status }}ing...
            <div i-svg-spinners-bars-rotate-fade />
        </div>
        <TerminalOutput :stream="stream" h-full />
    </div>
</template>
