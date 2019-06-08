import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import styled from "@emotion/styled"
import * as R from "ramda"
import { Accordion, Icon } from "semantic-ui-react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const flatten = arr =>
  arr.map(({ node: { data } }) => ({
    ...data,
  }))

const Header = styled.h2`
  color: white;
  background-color: #8e0101;
  padding: 10px;
  font-family: Love Ya Like A Sister;
`

const Categories = [
  "Pre-K to Kindergarten (Ages 3-5)",
  "Elementary (Ages 6-9)",
  "Middle School (Ages 10-13)",
  "High School (Ages 14-18)",
]

const Category = ({ name, data }) => {
  const [open, setOpen] = useState(false)
  const list = data.map(({ Name, URL }) => {
    return (
      <li>
        <a target="_blank" href={URL}>
          {Name}
        </a>
      </li>
    )
  })

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <Accordion.Title active={open} onClick={handleClick}>
        <Header>{name}</Header>
      </Accordion.Title>
      <Accordion.Content active={open}>
        <ul>{list}</ul>
      </Accordion.Content>
    </div>
  )
}

const IndexPage = ({ data }) => {
  const allData = flatten(data.allAirtable.edges)

  const allCategories = Categories.map(category => {
    const isInCategory = c => {
      if (R.isEmpty(c.Category)) return false
      return R.includes(category, c.Category)
    }

    const categoryData = R.filter(isInCategory, allData)
    return <Category key={category} name={category} data={categoryData} />
  })

  return (
    <Layout>
      <SEO title="For The Kids" />
      <Accordion>{allCategories}</Accordion>
    </Layout>
  )
}

export const query = graphql`
  query {
    allAirtable(filter: { table: { eq: "Main" } }) {
      edges {
        node {
          data {
            Name
            Category
            Type
            Desc
            URL
            Logo
          }
        }
      }
    }
  }
`

export default IndexPage
