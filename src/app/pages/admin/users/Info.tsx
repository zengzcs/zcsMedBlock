import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import AccessibleIcon from "@mui/icons-material/Accessible";
import EnhancedTable from "@/app/components/Table";
import AdminTable from "./tables/AdminTable";
import UserTable from "./tables/UserInfoTable";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 0, borderColor: "divider" }}
      >
        <Tab
          icon={<SupervisedUserCircleIcon></SupervisedUserCircleIcon>}
          label="平台账户管理"
          {...a11yProps(0)}
        />
        <Tab
          icon={<AdminPanelSettingsIcon></AdminPanelSettingsIcon>}
          label="管理员账户管理"
          {...a11yProps(1)}
        />
        <Tab
          icon={<AccessibleIcon></AccessibleIcon>}
          label="病人账户管理"
          {...a11yProps(2)}
        />
        <Tab
          icon={<MedicationLiquidIcon></MedicationLiquidIcon>}
          label="医生账户管理"
          {...a11yProps(3)}
        />
        <Tab
          icon={<AccountBalanceIcon></AccountBalanceIcon>}
          label="医疗机构账户管理"
          {...a11yProps(4)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserTable></UserTable>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminTable></AdminTable>
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
