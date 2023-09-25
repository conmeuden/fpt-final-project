
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
function Login() {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '1rem' }}>Đăng nhập</Typography>
            <form>
              <TextField 
                fullWidth 
                variant="outlined" 
                label="Tên đăng nhập" 
                margin="normal"
                required
              />
              <TextField 
                fullWidth 
                variant="outlined" 
                label="Mật khẩu"
                type="password"
                margin="normal"
                required
              />
              <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                fullWidth
                style={{ marginTop: '1rem' }}
              >
                Đăng nhập
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
    
    );
  }
  export default Login;