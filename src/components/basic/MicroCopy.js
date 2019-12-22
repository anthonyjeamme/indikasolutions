import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export const MicroCopy = ({ id }) => {
	const { allContentfulResource } = useStaticQuery(graphql`
		{
			allContentfulResource {
				edges {
					node {
						key
						value {
							value
						}
					}
				}
			}
		}
	`)

	const resources = allContentfulResource.edges
		.map(node => ({
			key: node.node.key,
			value: node.node.value.value
		}))
		.reduce((acc, cur) => {
			acc[cur.key] = cur.value
			return acc
		}, {})

	return resources[id] ? (
		resources[id]
	) : (
		<span className="color-danger">[MicroCopy] unknown id '{id}'</span>
	)
}
