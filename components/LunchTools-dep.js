//Currently deprecated due to the fact that everyone eats lunch at 12-12:30 due to remote learning
//When remote learning ends, this will be relevant so i'm keeping it
export function processLunch(processedPeriods, lunchPeriod, config) {
    var lunchPeriod = data.periods.findIndex(el => el.block === "Lunch") - 1;

    //If lunch period is free, reduce both periods into mega lunch
    if (config.blocks[processedPeriods[lunchPeriod].block.toLowerCase()].isFree) {
        var megaLunch = {
            block: processedPeriods[lunchPeriod].block,
            name: "Lunch " + processedPeriods[lunchPeriod].name.replace("- First Lunch", ""),
            period: processedPeriods[lunchPeriod].period,
            start: processedPeriods[lunchPeriod].start,
            end: processedPeriods[lunchPeriod + 1].end
        };
        processedPeriods.splice(lunchPeriod, 2)
        processedPeriods.splice(lunchPeriod, 0, megaLunch)

    }
    else if (config.blocks[processedPeriods[lunchPeriod].block.toLowerCase()].lunchType === 1) {
        var firstLunch = {
            block: processedPeriods[lunchPeriod].block,
            name: "First Lunch - " + showPeriodNumber(processedPeriods[lunchPeriod].period),
            period: processedPeriods[lunchPeriod].period,
            start: processedPeriods[lunchPeriod].start,
            end: processedPeriods[lunchPeriod].end
        };
        var secondHalfClass = {
            block: processedPeriods[lunchPeriod].block,
            name: processedPeriods[lunchPeriod].name.replace("- First Lunch", ""),
            period: processedPeriods[lunchPeriod].period,
            start: processedPeriods[lunchPeriod].end,
            end: processedPeriods[lunchPeriod + 2].end
        }
        processedPeriods.splice(lunchPeriod, 3)
        processedPeriods.splice(lunchPeriod, 0, secondHalfClass)
        processedPeriods.splice(lunchPeriod, 0, firstLunch)

    }
    else if (config.blocks[processedPeriods[lunchPeriod].block.toLowerCase()].lunchType === 2) {
        var clss = {
            block: processedPeriods[lunchPeriod].block,
            name: processedPeriods[lunchPeriod].name.replace("- Second Lunch", ""),
            period: processedPeriods[lunchPeriod].period,
            start: processedPeriods[lunchPeriod].start,
            end: processedPeriods[lunchPeriod + 1].end
        }
        var secondLunch = {
            block: processedPeriods[lunchPeriod].block,
            name: "Second Lunch - " + showPeriodNumber(processedPeriods[lunchPeriod].period),
            period: processedPeriods[lunchPeriod].period,
            start: processedPeriods[lunchPeriod].end,
            end: processedPeriods[lunchPeriod + 2].end
        };
        processedPeriods.splice(lunchPeriod, 3)
        processedPeriods.splice(lunchPeriod, 0, secondLunch)
        processedPeriods.splice(lunchPeriod, 0, clss)
    }
}

//Currently deprecated due to remote learning
{/* <View style={styles.row}>
        <Paragraph>Lunch Type</Paragraph>
        <Menu
            visible={menuOpen[block]}
            onDismiss={() => setMenuOpen(mu => ({ ...mu, [block]: false }))}
            anchor={
                <Button onPress={() => setMenuOpen(mu => ({ ...mu, [block]: true }))}>{showLunchType(config.blocks[block].lunchType)}</Button>}
        >
            <Menu.Item onPress={() => updateBlockLunch(block, 1)} title="First Lunch" />
            <Menu.Item onPress={() => updateBlockLunch(block, 2)} title="Second Lunch" />
        </Menu>
</View> */}
//     var [menuOpen, setMenuOpen] = useState({});
// function updateBlockLunch(block, lunch) {
//     updateBlockProp(block, lunch, "lunchType")
//     setMenuOpen(mu => ({ ...mu, [block]: false }))
// }