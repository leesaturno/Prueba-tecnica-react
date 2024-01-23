import { useEffect, useState } from "react"
import { NodeServices } from "../Services/NodeServices"
import { toast } from "react-toastify"

export default function useNode() {

const [nodes, setNodes] = useState([])
                const [languages, setLanguages] = useState([])
                const [languageSelected, setLanguageSelected] = useState([])
                const [isChildNodes, setIsChildNodes] = useState(false)
                const listNodes = () => {
                                NodeServices.listNode().then(res => {
                                                setNodes(res.data)
                                });
                }
                const listLocales = () => {
                                NodeServices.listLocales().then(res => {
                                                setLanguages(res.data)
                                });
                }

                useEffect(() => {
                                listNodes()
                                listLocales()
                }, [])
                const getChildNodes = (id) => {

                                NodeServices.listNode({ parent: id }).then(res => {
                                                setNodes(res.data)
                                                setIsChildNodes(true)
                                }).catch(error => {
                                                toast.error(error.response.data.message)
                                })
                }
                const getParentNodes = () => {

                                NodeServices.listNode().then(res => {
                                                setNodes(res.data)
                                                setIsChildNodes(false)
                                });
                }
                const createNode = (id) => {

                                NodeServices.createNode({ parent: id, locales: [languageSelected] }).then(res => {
                                                NodeServices.listNode({ parent: res.data.parent }).then(response => {
                                                                setNodes(response.data)
                                                                setIsChildNodes(true)
                                                });
                                });
                }
                const deleteNode = (id, parent) => {

                                NodeServices.deleteNode(id).then(() => {
                                                NodeServices.listNode({ parent: parent }).then(response => {
                                                                setNodes(response.data)
                                                                toast.success('Deleted has successfully')
                                                });
                                }).catch(error => {
                                                toast.error(error.response.data.message)
                                })
                }
                return { getParentNodes, getChildNodes, createNode, deleteNode, nodes, languages, setLanguageSelected, isChildNodes  }
}