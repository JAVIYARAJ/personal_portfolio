'use client'

import { useEffect, useState } from 'react'

const testimonials = [
  {
    quote:
      'Aryan delivered exceptional work on our e-commerce app. His attention to detail and understanding of user experience made all the difference.',
    author: 'Sarah Johnson',
    company: 'ShopFlow Co',
    index: 0,
  },
  {
    quote:
      'Working with Aryan was transformative. He not only built our app but also improved our development processes and team capabilities.',
    author: 'Michael Chen',
    company: 'Digital Ventures',
    index: 1,
  },
  {
    quote:
      'The quality of code and responsiveness throughout the project was outstanding. Aryan goes above and beyond on every deliverable.',
    author: 'Emma Roberts',
    company: 'TechFlow Studios',
    index: 2,
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
          What Clients{' '}
          <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">
            Say
          </span>
        </h2>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.index}
                  className="w-full flex-shrink-0 px-4 md:px-8"
                >
                  <div className="p-8 md:p-12 rounded-2xl border-l-4 border-accent-cyan bg-background hover:border-accent-blue transition-colors">
                    <p className="text-lg md:text-xl text-foreground mb-6 leading-relaxed italic">
                      &quot;{testimonial.quote}&quot;
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-foreground font-bold">
                        {testimonial.author[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                        <p className="text-muted text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-accent-cyan w-8'
                    : 'bg-muted/50 hover:bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
