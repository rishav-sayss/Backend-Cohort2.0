import *  as K8sApi from "@kubernetes/client-node"

const kc = new K8sApi.KubeConfig();
kc.loadFromCluster();

export const K8sCoreApi = kc.makeApiClient(K8sApi.CoreV1Api)


