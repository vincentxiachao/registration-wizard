import { Box } from '@mui/material';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Outlet } from 'react-router';
export default function Layout() {
  return (
    <DashboardLayout>
      <PageContainer>
        <Box className='h-full'>
          <Outlet />
        </Box>
      </PageContainer>
    </DashboardLayout>
  );
}
