import React from 'react'
import { useParams } from 'react-router'

export default function SellerAgents() {
    const {agent} = useParams();

  return (
    <div>{agent}'s details....</div>
  )
}
