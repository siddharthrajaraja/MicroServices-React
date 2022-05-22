## Amazing kubectl commands

Some commands to run infra files

`kubectl apply -f <yaml file name of configuration>` => create deployments or containers of docker image

`kubectl get pods` => get all running pods

`kubectl logs pod_name` => get log inside pod name

`kubectl exec -it posts sh` => get inside shell of the pod

`kubectl delete pod pod_name` => delete pod

`kubectl describe pod pod_name` => gived description of pod

`kubectl delete deployment deployment_name` => deletes current deployment

To push docker image in the docker hub `7906861671` is username=>

`docker build -t 7906861671/<image_name>`

`docker push 7906861671/<image_name>`

`kubectl rollout restart deployment deployement_name` => this command is preferred in production 

# Services
Networking or communication between pods in k8s cluster is taken care of services
Types of services:
* Cluster IP : Sets up easy to remember URL to access a pod. Only exposes a pods in cluster
* Node Port : Makes a pod accessible from outside the cluster (dev purpose)
* Load Balancers: Makes a pod accessible from outside the cluster. This is right way to expose a pod outside the world
* External name : Redirect an in-cluster request to CNAME url