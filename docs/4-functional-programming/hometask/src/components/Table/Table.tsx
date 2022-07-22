import { Table as MuiTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';

import styles from './Table.module.scss'

export interface Row {
  url: string
  username: string
  country: string
  name: string
  payments: number
  posts: number
}

interface TableProps {
  rows: Row[]
}

export function Table(props: TableProps) {
  const { rows } = props;
  
  return (
    <div className={styles.container}>
      <div className={styles.tableBackground}>
        <MuiTable className={styles.root} sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.bold}>Avatar</TableCell>
              <TableCell className={styles.bold} align="left">
                Username
              </TableCell>
              <TableCell className={styles.bold} align="left">
                Country
              </TableCell>
              <TableCell className={styles.bold} align="left">
                Name
              </TableCell>
              <TableCell className={styles.bold} align="left">
                Last Payments
              </TableCell>
              <TableCell className={styles.bold} align="left">
                Posts
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!rows ? rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">
                  <img
                    className={styles.avatar}
                    src={row.url}
                    alt="avatar"
                  />
                </TableCell>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="left">{row.country}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.payments[0] ? row.payments[0].totalSum : 0}</TableCell>
                <TableCell align="left">{row.posts}</TableCell>
              </TableRow>
            )): <CircularProgress color="inherit"/>}
          </TableBody>
        </MuiTable>
      </div>
    </div>
  );
}
