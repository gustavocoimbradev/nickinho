type props = {
    children: React.ReactNode;
    from: 'bot'|'human'|string;
}

export function Message({children,from}:props) {

    if (from === 'bot') {
        return (
            <div className="p-4 text-indigo-500 bg-indigo-300 rounded-xl w-max max-w-[70%]">
                {children}
            </div>
        )
    }

    if (from === 'human') {
        return (
            <div className="p-4 text-indigo-200 bg-indigo-400 rounded-xl w-max max-w-[70%] ms-auto">
                {children}
            </div>
        )
    }
    
}