"use client";

import { useEffect, useState } from "react";
import { createSupabaseClientBR } from "@/utils/supabase/client";

export default function Home() {
  const [papeles, setPapeles] = useState<any>([]);
  console.log("🚀 ~ Home ~ papeles:", papeles);

  useEffect(() => {
    async function fetchCategories() {
      const supabase = await createSupabaseClientBR();
      const { data, error } = await supabase.from("categories").select("*");
      console.log("🚀 ~ fetchCategories ~ data:", data);

      if (error) {
        console.error("Error cargando categorías:", error);
      } else {
        setPapeles(data);
      }
    }

    fetchCategories();
  }, []);
  return (
    <div>
      <h1>rocco app</h1>
    </div>
    // <div className="flex min-h-screen  bg-zinc-50 font-sans dark:bg-black">
    //   <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
    //     <h1 className="">ROCCO - APP</h1>
    //   </main>
    // </div>
  );
}
