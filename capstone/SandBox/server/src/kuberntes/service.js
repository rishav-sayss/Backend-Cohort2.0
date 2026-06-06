import { K8sCoreApi} from "./config.js";

export const createService = async (sandboxId) => {
    console.log("Creating service:", sandboxId);
    const serviceManifest = {
        metadata: {
            name: `sandbox-service-${sandboxId}`,
            labels: {
                 app:'sandbox',
                sandboxId: sandboxId
            }
        },
        spec: {
            selector: {
                app:'sandbox',
                sandboxId: sandboxId
            },
            ports: [
                {
                    name: "http",
                    port: 80,
                    targetPort: 5173,
                    protocol: "TCP"
                },
            ],
            type: "ClusterIP"
        }
    }

    const response = await K8sCoreApi.createNamespacedService({
        namespace: 'default',
        body: serviceManifest
    })

    return response;
}

// export async function deleteService(sandboxId) {
//     const response = await k8sCoreV1Api.deleteNamespacedService({
//         namespace: 'default',
//         name: `sandbox-service-${sandboxId}`
//     })

//     return response;
// }