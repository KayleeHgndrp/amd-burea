"use client";

import { type ReactNode } from "react";
import { TrendingUp, MessageSquare, Zap, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    icon: <TrendingUp className="w-4 h-4" />,
    text: "Administratie en btw-aangifte",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    text: "Inkomstenbelasting.",
  },
  {
    icon: <MessageSquare className="w-4 h-4" />,
    text: "We staan altijd voor je klaar.",
  },
];

function RightImage(): ReactNode {
  return (
    <div className="absolute inset-0 rounded-md border border-accent/10 overflow-hidden">
      <Image
        src="/images/test.png"
        alt="Persoonlijke boekhouder"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}

export function FeatureHighlight(): ReactNode {
  return (
    <section className="relative w-full bg-background pb-24 sm:pb-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          <div className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight text-foreground"
            >
              Jouw
         
              <span className="italic"> Persoonlijke</span>     <br />
              boekhouder
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mt-6 text-foreground/70 leading-relaxed max-w-lg"
            >
              AI is woven throughout your entire Finaro experience. Access real-time insights and personalized recommendations.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-8 space-y-4"
            >
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 text-foreground/60">
                    {feature.icon}
                  </span>
                  <span className="text-foreground/80">{feature.text}</span>
                </li>
              ))}
            </motion.ul>

            <motion.a
              href="#diensten"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium w-fit hover:bg-foreground/90 transition-colors"
            >
              Bekijk ons diensten
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
           
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative w-full h-full min-h-[360px] sm:min-h-[420px]"
          >
            <RightImage />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
