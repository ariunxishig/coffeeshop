import React from "react";
import mycss from "./style.module.css";
import { Button } from "baseui/button";
import ChevronDown from "baseui/icon/chevron-down";
import ChevronRight from "baseui/icon/chevron-right";
import Overflow from "baseui/icon/overflow";
import { StyledLink } from "baseui/link";
import { StatefulMenu } from "baseui/menu";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { withStyle, useStyletron } from "baseui";
import { StyledTable, StyledHeadCell, StyledBodyCell } from "baseui/table-grid";
import { Tag } from "baseui/tag";

function Tasks(props) {
  const [css] = useStyletron();
  const arr = Object.entries(props);
  let title = '';
  let coltitle1='Small';
  let coltitle2='Big';
  const titles = ["5 Smoothie, Shake", "6 Ade"];
  const twoColTitles = ['2 Frappucino', '3 Tea', "4 Gr-coffee", "8 Deserts"];
  if(arr) {
    title=arr[1][1];
    if(title === '1 Coffee'  || title === '7 NoCaffeine') {
      coltitle1 = 'Hot';
      coltitle2 = 'Cold';
    } else if(!titles.includes(title)){
      coltitle1 = '';
      coltitle2 = '';
    }
  }
  
  return (
    <div
      className={css({
        gridColumn: "span 4",
        padding: "12px 24px"
      })}
    >
      <StyledTable $gridTemplateColumns="min-content fit-content(30%) fit-content(30%) max-content">
        <StyledHeadCell $sticky={false}>Products</StyledHeadCell>
        <StyledHeadCell $sticky={false}>{coltitle1}</StyledHeadCell> 
        <StyledHeadCell $sticky={false}>{coltitle2}</StyledHeadCell>
        <StyledHeadCell $sticky={false}>Cost</StyledHeadCell>
        {props.tasks.map((task, index) => {
          return (
            <React.Fragment key={index}>
              <StyledBodyCell>{task[0]}</StyledBodyCell>
              {!twoColTitles.includes(title) ? 
                <StyledBodyCell>
                  <Button className={mycss.notification} 
                    size="compact" 
                    kind="minimal" 
                    shape="square"
                    onClick={() => props.glblState.orderHas(1, props.glblState, title, index)}                        
                  ><span>-</span>
                  </Button>
                  &nbsp;&nbsp;
                  <Button className={mycss.notification} 
                    size="compact" 
                    kind="minimal" 
                    shape="square" 
                    onClick={() => props.glblState.orderNem(2, props.glblState, title, index)}
                  ><span>+</span>
                  <span className={mycss.badge}>{task[1]}</span>
                  </Button>
                </StyledBodyCell> 
                :
                <StyledBodyCell></StyledBodyCell> 
              }
              <StyledBodyCell>
                <Button className={mycss.notification} 
                  size="compact"
                  kind="minimal"
                  shape="square"
                  onClick={() => props.glblState.orderSub(3, props.glblState, title, index)}
                ><span>-</span>
                </Button>
                &nbsp;&nbsp;
                <Button className={mycss.notification}
                  size="compact"
                  kind="minimal"
                  shape="square"
                  onClick={() => props.glblState.orderAdd(4, props.glblState, title, index)}
                >
                  <span>+</span>
                  <span className={mycss.badge}>{ task[2] }</span>
                </Button>
              </StyledBodyCell>
              <StyledBodyCell>
                <StyledLink>{task[3]}</StyledLink>
              </StyledBodyCell>
            </React.Fragment>
          );
        })}
      </StyledTable>
    </div>
  );
}

const CenteredBodyCell = withStyle(StyledBodyCell, {
  display: "flex",
  alignItems: "center",
  paddingBottom:"8px"
});

function Row({striped, row, glblState}) {
  const [css] = useStyletron();
  const [expanded, setExpanded] = React.useState(false);
  return (
    <React.Fragment>
      <CenteredBodyCell $striped={striped}>
        <Button
          size="mini"
          kind="minimal"
          onClick={() => setExpanded(!expanded)}
          shape="pill"
        >
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </Button>
        {row[0]}
      </CenteredBodyCell>
      <CenteredBodyCell $striped={striped}>
        <Tag closeable={false} >{row[1]}</Tag>
      </CenteredBodyCell>
      <CenteredBodyCell $striped={striped}>{row[3]}</CenteredBodyCell>
      <CenteredBodyCell $striped={striped}>
        <div
          className={css({
            textOverflow: "clip",
            maxWidth: "100px",
            overflow: "hidden",
            whiteSpace: "nowrap"
          })}
        >
          {row[2]}
        </div>
        <StatefulPopover
          placement={PLACEMENT.bottomLeft}
          content={({ close }) => (
            <StatefulMenu
              items={[
                { label: "One" },
                { label: "Two" },
                { label: "Three" },
                { label: "Four" }
              ]}
              onItemSelect={() => close()}
              overrides={{
                List: { style: { height: "144px", width: "80px" } }
              }}
            />
          )}
        >
          <Button shape="square" kind="minimal" size="compact">
            <Overflow size={18} />
          </Button>
        </StatefulPopover>
      </CenteredBodyCell>
      {expanded && <Tasks tasks={row[4]} title={row[0]} glblState={glblState}/>}
    </React.Fragment>
  );
}

const MenuList = props => {
  const [css] = useStyletron();
  return (
    <div className={css({ height: "600px" })}>
      <StyledTable $gridTemplateColumns="auto auto auto auto">
        <StyledHeadCell>Product Category</StyledHeadCell>
        <StyledHeadCell>Image</StyledHeadCell>
        <StyledHeadCell>Total Cost</StyledHeadCell>
        <StyledHeadCell>Ingredients</StyledHeadCell>
        { props.data && props.data.map((row, index) => {
          const striped = index % 2 === 0;
          return <Row key={index} row={row} striped={striped} glblState={props}/>;
        })}
      </StyledTable>
    </div>
  );
}

export default MenuList;
