import OutlinedInput from '@mui/material/OutlinedInput';

export default function InputPattern({type, name, placeholder, value, onChange}) {

  const shadow = 'rgba(16, 24, 40, 0.05)';

  return (
      <div>      
            <OutlinedInput 
            sx={{
                width: '100%', height: '2.75rem',fontSize: '1rem', color:"#667085",
                borderRadius: '0.5rem', backgroundColor:'#FFFFFF', boxShadow:`0rem 0.063rem 0.125rem 0rem ${shadow}`,
              }}
            variant='outlined'
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            />
      </div>
     );
}
