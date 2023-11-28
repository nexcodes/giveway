import { getPrizeForUser, getUser } from "@/actions/supabase-actions"
import { notFound, redirect } from "next/navigation"

interface PrizePageProps {
    params: { prizeId: string }
  }

export default async function PrizePage({ params }: PrizePageProps) {
    const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  const prize = await getPrizeForUser(params.prizeId)

  if (!prize) {
    notFound()
  }
    return (
        <div className="">{params.prizeId}</div>
    )
}