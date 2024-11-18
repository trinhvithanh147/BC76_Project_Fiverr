export const ButtonGhost = ({content,icon,type="button"}) =>{
    return (
        <button type={type} className="py-2 px-4 hover:text-green-500">{icon && <span className="mr-2">{icon}</span> }{content}</button>
    ) 
} 


export const ButtonOutline = ({content,icon,onClick,type="button",className=""}) =>{
    return (
      <button type={type} onClick={onClick} className={`py-1 px-4 border border-green-500 text-green-500 duration-200 rounded-md hover:text-white hover:bg-green-600 hover:font-medium ${className}`}>
        {icon && <span className="mr-2">{icon}</span>}
        {content}
      </button>
    );
}
