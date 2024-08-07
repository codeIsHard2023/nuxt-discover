<script setup lang="ts">
const iframe = ref<HTMLIFrameElement>();
const webContUrl = ref<string>();

type Status = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'

const status = ref<Status>('init')
const error = ref<{ message: string }>() // maybe use shallowRef instead of ref ? 

async function startDevServer() {
    const webContainer = await useWebContainer();

    webContainer.on("server-ready", (port, url) => {
        status.value = 'ready'
        // iframe.value!.src = url;
        webContUrl.value = url;
    });

    webContainer.on('error', (err) => { error.value = err })

    status.value = 'mount'
    await webContainer.mount({
        "package.json": {
            file: {
                contents: JSON.stringify(
                    {
                        private: true,
                        scripts: {
                            dev: "nuxt dev",
                        },
                        dependencies: {
                            nuxt: "latest",
                        },
                    },
                    null,
                    2
                ),
            },
        },
    });

    status.value = 'install'

    const installProcess = await webContainer.spawn("npm", ["install"]);
    const installExitCode = await installProcess.exit;

    if (installExitCode !== 0) {
        error.value = {
            message: `Unable to run npm install, exit as ${installExitCode}`
        }
        throw new Error("Unable to run npm install");
    }
    status.value = 'start'

    await webContainer.spawn("npm", ["run", "dev"]);
}

watchEffect(() => {
    if (iframe.value && webContUrl.value) iframe.value.src = webContUrl.value;
});

onMounted(startDevServer);
</script>

<template>
    <iframe ref="iframe" w-full h-full />
</template>
