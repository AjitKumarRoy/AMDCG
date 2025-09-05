"use client";

import { motion } from 'framer-motion';
import pageData from '@/data/careersPage/careersPage.json';
import { PageHero } from '@/components/ui/PageHero';
import { ComingSoon } from '../ui/ComingSoon';

export const CareersClientPage = () => {
    return (
        <motion.div
            className="bg-slate-950 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <PageHero
                title={pageData.hero.title}
                subtitle={pageData.hero.subtitle}
                backgroundImage={pageData.hero.backgroundImage}
            />

            <ComingSoon />
        
        </motion.div>
    );
};