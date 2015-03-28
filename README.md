## Sextant

Sextant is a web interface for the [Kubernetes Remote API](http://kubernetes.io/third_party/swagger-ui/#!/). The goal is 
to provide a pure client side implementation so it is effortless to connect and manage [Kubernetes](http://kubernetes.io/). 
This project is not complete and is still under heavy development.

### Goals

* Minimal dependencies - I really want to keep this project a pure html/js app.
* Consistency - The web UI should be consistent with the commands found on the [kubectl CLI](https://github.com/GoogleCloudPlatform/kubernetes/blob/master/docs/kubectl.md).
* Integrative - It should suffer you to the right [DockerUI](https://github.com/crosbymichael/dockerui)-Pages to see what is happened on the minions.
 
### Container Quickstart 

1. Run: `kubectl create -f kubernetes/sextant.json`
2. Open your browser to `http://<sextant host ip>:9000`