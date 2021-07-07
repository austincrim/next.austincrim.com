import * as React from 'react'
import { GetStaticProps } from 'next'
import { getPosts } from '../lib/posts'
import { getProjects } from '../lib/projects'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Footer from '../components/Footer'
import ProjectCard from '../components/ProjectCard'
import { LinkedInLogo, Mail } from '../components/Icons'
import PostPreview from '../components/PostPreview'
import Layout from '../components/Layout'
import type { Post, Project } from '@prisma/client'

export default function Index({
  projects,
  posts
}: {
  projects: Array<Project>
  posts: Array<Post>
}) {
  return (
    <Layout>
      <main>
        <Hero />
        <Section title='Things I Have Built' id='portfolio'>
          <ul className='flex flex-col gap-10'>
            {projects.map((project) => (
              <li key={project.title}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Section>
        <Section title='Things I Have Written' id='blog'>
          <ul className='flex flex-col mt-20 space-y-20'>
            {posts.map((post) => (
              <li key={post.slug}>
                <PostPreview post={post} />
              </li>
            ))}
          </ul>
        </Section>
        <Section title='Want to Chat?' id='contact'>
          <div className='grid grid-cols-2 mx-auto text-muted dark:text-gray-100'>
            <div className='p-4 text-center'>
              <div className='w-1/2 mx-auto text-lg font-semibold md:w-auto'>
                Email
                <div className='w-8 h-8 mx-auto my-2 text-muted'>
                  <Mail />
                </div>
              </div>
              <a
                href='mailto:aust.crim@gmail.com'
                className='mt-1 transition-colors text-primary hover:text-secondary'
              >
                aust.crim@gmail.com
              </a>
            </div>
            <div className='p-4 text-center'>
              <div className='w-1/2 mx-auto text-lg font-semibold md:w-auto'>
                LinkedIn
                <div className='w-8 h-8 mx-auto my-2 text-muted'>
                  <LinkedInLogo />
                </div>
              </div>
              <a
                className='mt-1 transition-colors text-primary hover:text-secondary'
                href='https://www.linkedin.com/in/austin-crim'
              >
                Profile
              </a>
            </div>
          </div>
        </Section>
      </main>

      <Footer>Designed and developed by Austin Crim</Footer>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [posts, projects] = await Promise.all([
    getPosts({ take: 3, orderBy: { hits: 'desc' } }),
    getProjects()
  ])

  return {
    props: {
      projects,
      posts: posts
    },
    revalidate: 1
  }
}
