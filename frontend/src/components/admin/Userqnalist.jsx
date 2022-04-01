
import { useEffect, useState } from 'react';
import Styles from "./Userqnalist.module.css";

import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import Userqnacontent from './Userqnacontent';
import axios from 'axios';
  
// function CreateData(name, calories, fat) {
//     return { name, calories, fat };
//   }

//   const rows = [
//     createData('사랑해요신짱아', 'shinjja@naver.com', 3.7),
//     createData('오마이걸짱', 'loveomg@omg.com', 25.0),
//     createData('아이유아니유', 'iuau@iuana.com', 16.0),
//     createData('갓구아짱', 'guajjang@gua', 6.0),
//     createData('이부장님', 'bujanglee@ssafy.com', 16.0),
//     createData('서대리', 'whydearee@ssafy.com', 3.2),
//     createData('배수지환', 'BsuzyH@ssafy.com', 9.0),
//     createData('저스트 비버', 'fakebieber@singer.com', 0.0),
//     createData('능력주헌', 'superjung@ssafy', 26.0),
//     createData('승진원츄', 'teamkim@ssafy.com', 0.2),
//     createData('Marshmallow', 318, 0),
//     createData('Nougat', 360, 19.0),
//     createData('Oreo', 437, 18.0),
//   ];
  // ].sort((a, b) => (a.calories < b.calories ? -1 : 1));
  
  //표 css
  const Root = styled('div')`
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      box-shadow: 0.2vw 0.1vw 0.2vw 0.1vw #babb9536;
      width: 60vw;
      height: 40vh;
      margin-top: 20vh;
      margin-left: 20vw;
      position: fixed;
      border: 0.1vw solid #babb9536;
    }
  
    td,
    th {
      border: 1px solid #ddd;
      text-align: left;
      padding: 8px;
      height: 2vh;
      font-family: 'GangwonEdu_OTFBoldA';
      font-weight: 400;
      font-size: 2.5vh; 
    }
  
    th {
      background-color: #3afaca2a;
      font-family: 'RussoOne';
    }
    `;
  
    //페이지네에션 css
  const CustomTablePagination = styled(TablePaginationUnstyled)`
    & .MuiTablePaginationUnstyled-toolbar {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .MuiTablePaginationUnstyled-selectLabel {
      margin: 0;
    }
  
    & .MuiTablePaginationUnstyled-displayedRows {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .MuiTablePaginationUnstyled-spacer {
      display: none;
    }
  
    & .MuiTablePaginationUnstyled-select {
      background-color: #e8eca000;
    }
  
    & .MuiTablePaginationUnstyled-actions {
      display: flex;
      gap: 0.25rem;
      background-color: #e8eca000;
    }
  `;

function Userqnalist () {

    const id = sessionStorage.getItem("userid")
    const token = sessionStorage.getItem("token")
    const role = sessionStorage.getItem("role")

    //list 저장할 배열
    const [rows , setRows] = useState([]);

    // const getrows =() =>  {
    //     axios
    //       .get("http://j6a304.p.ssafy.io//api/contact/admin",
    //         {
    //             headers:{
    //                 refreshToken: token,
    //             },
    //     })
    //     .then((res) => {
    //         console.log("res", res);
    //         console.log("데이터", res.data);
    //         setRows(res.data);
    //         console.log(rows);
    //     })
    //     .catch(error => {
    //         console.log("error", error);
    //         console.log("목록 출력 실패");
    //     })

    // }

    useEffect (() => {
        // getrows();
        axios
          .get("http://j6a304.p.ssafy.io/api/contact/admin",
            {
                headers:{
                    // refreshToken: token,
                    "Authorization": token,
                },
        })
        .then((res) => {
            console.log("res", res);
            console.log("데이터", res.data);
            setRows(res.data);
            console.log(rows);
        })
        .catch(error => {
            console.log("error,qnalist \n", error);
            console.log("목록 출력 실패 - qnalist");
        })
    }, [])


    //페이지네이션용
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [showcontent, setShowcontent] = useState(false);
    const [hiddencontent, setHiddencontent] = useState(true);

    const getShowcontent = () => {
        setShowcontent(true);
        setHiddencontent(false);
    }
    
    const getHiddencontent = () => {
        setShowcontent(false);
        setHiddencontent(true);
    }

    return(
        <Root>
            <div>
                <table style={{top: '27vh'}} aria-label="custom pagination table">
                    <thead>
                        <tr>
                        <th>Type</th>
                        <th>Id</th>
                        <th>E-mail</th>
                        <th>Title</th>
                        <th>Content</th>
                        </tr>
                    </thead>
                    {showcontent === false?
                        <tbody>
                            {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                            ).map((row) => (
                                <tr key={row.name}>
                                    <td style={{ width: '6vw' }} onclick={getShowcontent}>{row.contactType}</td>
                                    <td style={{ width: '10vw' }} align="right" onclick={getShowcontent}>
                                    {row.id}
                                    </td>
                                    <td style={{ width: '13vw' }} align="right" onclick={getShowcontent}>
                                    {row.email}
                                    </td>
                                    <td style={{ width: '16vw' }} align="right" onclick={getShowcontent}>
                                    {row.title}
                                    </td>
                                    <td style={{ width: '6vw' }} align="right" onclick={getShowcontent}>
                                        {/* <button className={Styles.button}> </button> */}
                                        <Userqnacontent content={row.content} title={row.title}/>
                                    </td>
                                </tr>
                            ))}

                            {emptyRows > 0 && (
                            <tr style={{ height: 41 * emptyRows }}>
                                <td colSpan={3} />
                            </tr>
                            )}
                        </tbody>
                        :
                        <tbody></tbody>
                    }
                    <tfoot>
                        <tr>
                        <CustomTablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={5}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            componentsProps={{
                            select: {
                                'aria-label': 'rows per page',
                            },
                            actions: {
                                showFirstButton: true,
                                showLastButton: true,
                            },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            className={Styles.page}
                        />
                        </tr>
                    </tfoot>
                </table>
            </div>
        </Root>
    )
}

export default Userqnalist;