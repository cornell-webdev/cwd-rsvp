import { Text } from 'cornell-glue-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { useMyTickets } from 'src/api/ticket'
import styled from 'styled-components'

const MyTickets = () => {
  const { myTickets } = useMyTickets()

  return (
    <Container>
      MyTickets
      {myTickets?.map((ticket) => (
        <div key={ticket?._id}>
          <Link to={`/profile/ticket-details/${ticket?._id}`}>
            <Text>{ticket?._id}</Text>
          </Link>
        </div>
      ))}
    </Container>
  )
}

const Container = styled.div``

export default MyTickets
