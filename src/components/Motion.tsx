'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(useGSAP)
export function Motion({children,className=''}:{children:React.ReactNode;className?:string}){const ref=useRef<HTMLDivElement>(null);useGSAP(()=>{if(ref.current)gsap.fromTo(ref.current,{opacity:0,y:24},{opacity:1,y:0,duration:.7,ease:'power2.out'})},{scope:ref});return <div ref={ref} className={className}>{children}</div>}
export function ScrollReveals(){useEffect(()=>{const items=document.querySelectorAll('.reveal');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&entry.target.classList.add('visible')),{threshold:.12});items.forEach(item=>observer.observe(item));return()=>observer.disconnect()},[]);return null}
