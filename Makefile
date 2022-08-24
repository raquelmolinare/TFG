clean:
	find . -name "*.aux" -type f -delete
	cd doc/ && rm -f tfg.toc tfg.out tfg.lot tfg.log tfg.lof tfg.ind tfg.ilg tfg.fls tfg.fdb_latexmk tfg.brf tfg.blg tfg.bbl tfg.idx
# Corrector ortográfico
spell:
	bash ./scripts/spell_check.sh

install-spell:
	bash ./scripts/spell_install.sh

order-dic:
	python ./scripts/order_dico.py

workflow-spell: install-spell order-dic spell