import { lazy } from "react";

const About = lazy(() => import("./components/about"));
const Git = lazy(() => import("./topics/gitDeep"));
const Rebase = lazy(() => import("./topics/rebase"));
const Merge = lazy(() => import("./topics/merge"));
const Hooks = lazy(() => import("./topics/hooks"));
const Containers = lazy(() => import("./topics/containers"));
const Dockerfile = lazy(() => import("./topics/dockerfile"));
const Networking = lazy(() => import("./topics/networking"));
const CiCd = lazy(() => import("./topics/ciCd"));
const Actions = lazy(() => import("./topics/githubActions"));
const Cloud = lazy(() => import("./topics/cloudBasics"));
const Ec2 = lazy(() => import("./topics/awsEc2"));
const S3 = lazy(() => import("./topics/s3"));
const Iam = lazy(() => import("./topics/iam"));
const Load = lazy(() => import("./topics/loadBalancer"));
const Proxy = lazy(() => import("./topics/reverseProxy"));
const Nginx = lazy(() => import("./topics/nginx"));

const items = [
    ["overview", "Overview", About],
    ["git", "Git deep dive", Git],
    ["rebase", "Rebase", Rebase],
    ["merge", "Merge", Merge],
    ["hooks", "Hooks", Hooks],
    ["containers", "Containers", Containers],
    ["dockerfile", "Dockerfiles", Dockerfile],
    ["networking", "Networking", Networking],
    ["ci-cd", "CI/CD", CiCd],
    ["github-actions", "GitHub Actions", Actions],
    ["cloud-basics", "Cloud basics", Cloud],
    ["aws-ec2", "AWS EC2", Ec2],
    ["s3", "Amazon S3", S3],
    ["iam", "IAM", Iam],
    ["load-balancer", "Load balancer", Load],
    ["reverse-proxy", "Reverse proxy", Proxy],
    ["nginx", "Nginx", Nginx],
];

export default items;
