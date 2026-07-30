const repoName = 'retrofuturism';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isGithubActions ? `/${repoName}` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
