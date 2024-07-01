import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'

const About = () => {
  return (
    <section id='about'>
      <h1 className='flex items-center justify-center text-5xl pt-20 pb-10'>About us</h1>
      <BentoGrid>
        {gridItems.map
        (({id, title, description, className, img, imgClassName, titleClassName, spareImg})=>(
            <BentoGridItem
            id={id}
            key={id}
            title={title}
            description={description} 
            className={className}
            img={img}
            imgClassName={imgClassName}
            titleClassName={titleClassName}
            spareImg={spareImg}/>
        ))}
      </BentoGrid>
    </section>
  )
}

export default About