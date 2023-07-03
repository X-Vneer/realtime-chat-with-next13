import AddFrindsForm from '@/components/AddFrindsForm'
import React from 'react'

type Props = {}

export default function AddFrinds(props: Props) {
    return (
        <section className='p-8 grow'>
            <h1 className='mb-8  text-3xl lg:text-5xl font-bold  text-gray-900'>Add a new friend</h1>
            <AddFrindsForm />
        </section>
    )
}
