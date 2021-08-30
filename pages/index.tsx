import Image from 'next/image'

export default function Home() {
    return (
        <>
        <div style={{
            width: '100%',
            height: '80vh',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image src="/logo.svg" alt="logo" height={200} width={200} />
        </div>
        </>
    )
}
