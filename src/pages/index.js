import React from "react"
import { Link, graphql } from "gatsby"
import styled from "@emotion/styled"
import * as R from "ramda"
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
  "Early Childhood (Ages 3-8)",
  "Middle Childhood (Ages 9-11)",
  "Middle School (Ages 12-14)",
  "High School (Ages 14-18)",
]

const Category = ({ name, data }) => {
  const list = data.map(({ Name, URL }) => {
    return <li><a target="_blank" href={URL}>{Name}</a></li>
  })

  return (
    <div>
      <Header>{name}</Header>
      <ul>{list}</ul>
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
      {allCategories}
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
