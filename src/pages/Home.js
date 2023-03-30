import React, { useState } from 'react'
import Images from '../assets/images';
import { motion } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .5 }}
      >
        <h1>Hello World</h1>
      </motion.div>
    </main>)

}
