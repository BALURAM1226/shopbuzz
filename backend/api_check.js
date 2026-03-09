import { Client } from "@gradio/client";

async function check() {
    try {
        const app = await Client.connect("levihsu/OOTDiffusion");
        const api_info = await app.view_api();
        console.log(JSON.stringify(api_info, null, 2));
    } catch (e) {
        console.error(e.message);
    }
}

check();
